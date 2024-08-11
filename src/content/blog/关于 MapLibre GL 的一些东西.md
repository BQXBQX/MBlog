---
title: "关于 MapLibre GL 的一些东西"
description: "最近在做一些地图的开发，发现大部分的地图的实现都是基于 `Leaflet` 实现的，但是 `Leaflet` 有一个很大的问题，他是通过直接操纵 `Dom` 实现的地图的控制和渲染操作的操作，因此无论怎么优化，用户体验都是极差的，于是我就找到了另外一个方案： `MapLibre GL` 。"
pubDate: "2024-08-11T17:44:23.976Z"
heroImage: "/img/Sticky/heroImage.jpg"
---

# 关于 MapLibre GL 的一些东西

最近在做一些地图的开发，发现大部分的地图的实现都是基于 `Leaflet` 实现的，但是 `Leaflet` 有一个很大的问题，他是通过直接操纵 `Dom` 实现的地图的控制和渲染操作的操作，因此无论怎么优化，用户体验都是极差的，于是我就找到了另外一个方案： `MapLibre GL` 。

## 简介

对于 `MapLibre GL` ，他还有一个孪生兄弟 `Mapbox GL` ， `Mapbox GL` 非常的强大，而且还提供网络服务，但是他是不开源的。 相比之下，`MapLibre GL` 是一个开源的项目，提供了类似的功能，但没有网络服务，这意味着你可以完全控制和自定义你的地图应用（最重要的是不要看人家的脸色了 👀）。

`MapLibre GL` 是一个基于 `Web QL` 实现的一个地图生成库，所以他的渲染的问题是完全不用考虑的。（这也就意味着写代码时可以毫无顾及的叠屎山了 🤪）。

OK，介绍也介绍完了，下面我们进入开发环节。

## `Quick Start`

按照官方文档一步一步来即可，这里不做过多陈述，这里主要讲一讲组件的封装。

由于官方的代码写法十分的古老**👹**，同时为了后期的其他的地图的使用，我们决定将组件封装起来，将代码实现语义化同时暴露出来一些经常使用的方法便于 `Quick Start` （这里偷偷告诉你，我们要做的是一个 `Genshin Map` 🗾）。下面是封装的几个最基础的样例，想偷懒的兄弟可以直接 `Copy` ，并且在上面扩展，写出自己想要的地图。

### 封装样例

下面是 `Map` 的封装

```tsx
import {
  Children,
  cloneElement,
  forwardRef,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import * as maplibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export interface MapProps extends Omit<maplibreGL.MapOptions, "container"> {
  /**
   * container
   */
  container?: string | HTMLElement;
  /**
   * children element of the map
   */
  children?: ReactElement[] | ReactElement;
  /**
   * transformRequest
   */
  transformRequest: maplibreGL.RequestTransformFunction;
  /**
   * mapInfo, the infomation of this
   */
  mapInfo?: MapInfo;
  /**
   * layer the layer of the map
   */
  layers?: maplibreGL.LayerSpecification[];
  /**
   * source the source of the map
   */
  source?: maplibreGL.SourceSpecification;
}

export interface MapInfo {
  map_version: string;
  min_zoom: number;
  max_zoom: number;
  origin: [number, number];
  center: [number, number];
}

export const Map = forwardRef<{}, MapProps>(
  (
    {
      container,
      children,
      transformRequest,
      mapInfo,
      layers,
      source,
      style,
      ...rest
    },
    ref
  ) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const glMap = useRef<maplibreGL.Map | null>(null);
    const [map, setMap] = useState<maplibreGL.Map | null>(null);

    useEffect(() => {
      if (mapContainer.current) {
        glMap.current = new maplibreGL.Map({
          container: container ?? mapContainer.current, // Reference to the map container
          style: {
            version: 8, // Style specification version
            sources: source ? { source } : {},
            layers: layers ?? [],
          },
          transformRequest: transformRequest,
          ...rest,
        });

        glMap.current.on("load", () => {
          setMap(glMap.current);
        });

        if (ref) {
          (ref as React.MutableRefObject<maplibreGL.Map>).current =
            glMap.current;
        }
      }
      // Cleanup function to remove the map instance and event listeners when the component unmounts
      return () => {
        if (glMap.current) glMap.current.remove(); // Remove the map instance
      };
    }, [container, transformRequest, mapInfo, layers, source, rest]);

    return (
      <>
        <div
          style={{ background: "black", width: "100vw", height: "100vh" }}
          ref={mapContainer}
        >
          {map &&
            children &&
            Children.map(children, (child) =>
              cloneElement(child, { currentMap: map })
            )}
        </div>
      </>
    );
  }
);

Map.displayName = "Map";
```

下面是 `Layer` 的封装

```tsx
import * as maplibreGL from "maplibre-gl";
import React, { useEffect } from "react";

export interface LayerProps {
  /**
   * currentMap, give me the Map, i will bind this layout to this map
   */
  currentMap?: maplibreGL.Map;
  /**
   * layout options
   */
  layerOptions: maplibreGL.LayerSpecification;
  /**
   * isSourceLoaded, source loaded the layer will add
   */
  isSourceLoaded?: boolean;
}

export type LayerOptions = maplibreGL.LayerSpecification;

export const Layer = React.forwardRef<
  maplibreGL.LayerSpecification,
  LayerProps
>(({ currentMap, layerOptions, isSourceLoaded }, ref) => {
  useEffect(() => {
    if (!currentMap) return;

    if (isSourceLoaded) {
      currentMap.addLayer({ ...layerOptions });

      if (ref) {
        (ref as React.MutableRefObject<maplibreGL.LayerSpecification>).current =
          layerOptions;
      }
    }

    return () => {
      if (currentMap.getLayer(layerOptions.id))
        currentMap.removeLayer(layerOptions.id);
    };
  }, [currentMap, layerOptions, isSourceLoaded]);

  return null;
});

Layer.displayName = "Layer";
```

下面是 `Source` 的封装

```tsx
import * as maplibreGL from "maplibre-gl";
import {
  Children,
  cloneElement,
  forwardRef,
  ReactElement,
  useEffect,
  useState,
} from "react";

export interface SourceProps {
  /**
   * currentMap, give me the map, i will bind this source to this map
   */
  currentMap?: maplibreGL.Map;
  /**
   * source options
   */
  sourceOptions: maplibreGL.SourceSpecification;
  /**
   * source Id
   */
  sourceId: string;
  /**
   * children, the children element of  sourceProps
   */
  children?: ReactElement | ReactElement[];
}

export type SourceOptions = maplibreGL.SourceSpecification;

export const Source = forwardRef<maplibregl.SourceSpecification, SourceProps>(
  ({ currentMap, sourceOptions, sourceId, children }, ref) => {
    const [isSourceLoaded, setIsSourceLoaded] = useState<boolean>(false);
    useEffect(() => {
      if (!currentMap) return;

      if (!currentMap.getSource(sourceId)) {
        currentMap.addSource(sourceId, sourceOptions);

        // Listen for the source being added
        currentMap.on("sourcedata", function (e) {
          if (e.sourceId === sourceId && e.isSourceLoaded) {
            setIsSourceLoaded(true);
          }
        });
      }

      if (ref) {
        (
          ref as React.MutableRefObject<maplibreGL.SourceSpecification>
        ).current = sourceOptions;
      }

      return () => {
        if (currentMap.getSource(sourceId)) currentMap.removeSource(sourceId);
      };
    }, [currentMap, sourceOptions, sourceId]);

    return (
      <>
        {sourceId &&
          children &&
          isSourceLoaded &&
          Children.map(children, (child) => {
            const { layerOptions } = child.props;
            const newLayerOptions = { ...layerOptions, source: sourceId };
            return cloneElement(child, {
              currentMap: currentMap,
              isSourceLoaded: isSourceLoaded,
              layerOptions: newLayerOptions,
            });
          })}
      </>
    );
  }
);

Source.displayName = "Source";
```

… 还有 `Marker` ， `Control` 。（🌚 懒了就没写）

通过这些封装，我们可以更加轻松地使用 `MapLibre GL` 创建和管理地图组件。接下来，我将展示一个简单的示例，来具体讲一讲如何使用这些封装的组件来构建一个基本的地图应用。

```tsx
import {
  Map,
  Layer,
  Source,
  type MapInfo,
  type LayerOptions,
  type SourceOptions,
} from "maplibre-components";

export const Main = () => {
  const maxZoomLevel = 6;
  const minZoomLevel = 2;
  const defaultZoomLevel = 2;
  const layer: LayerOptions = {
    id: "raster-~~layer~~", // Layer ID
    type: "raster", // Layer type
    source: "tiles", // Source ID defined above
    minzoom: minZoomLevel - 1, // Minimum zoom level for this layer
    maxzoom: maxZoomLevel + 1, // Layer's maximum zoom level (one more than map's maxZoom)
  };

  const mapInfo: MapInfo = {
    map_version: "xxx",
    min_zoom: -3,
    max_zoom: 0,
    origin: [xxx, xxx],
    center: [xxx, xxx], // 相对于origin的偏移量
  };

  const source: SourceOptions = {
    type: "raster", // Specify the type as raster for raster tiles
    tiles: [
      `xxx`, // URL template for your tile layer
    ],
    tileSize: 256, // Size of the tiles
  };

  return (
    <Map
      mapInfo={mapInfo}
      maxZoom={maxZoomLevel}
      minZoom={minZoomLevel}
      zoom={defaultZoomLevel}
      renderWorldCopies={false}
      transformRequest={transformRequest}
    >
      <Source sourceOptions={source} sourceId="tiles">
        <Layer layerOptions={layer}></Layer>
      </Source>
    </Map>
  );
};
```

这就是上文的全部内容了，如果有任何的疑问都可以在评论区留言哦。（偷偷告诉你 `MapLibre GL` 是不支持自定义地图的，艹，当时因为这个踩坑踩 🐴 了）。

![end](/img/MapLibre/Untitled.png)
