import { useEffect, useRef } from "react";
import L from "leaflet";

function TravelMap({ day, activeItem, onSelect }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layerGroupRef = useRef(null);
  const markerRefs = useRef({});
  const onSelectRef = useRef(onSelect);
  const previousDayIdRef = useRef(day?.id);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true
    }).setView([36.08, 120.45], 11);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
        minZoom: 3
      }
    ).addTo(map);

    mapRef.current = map;
    layerGroupRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
      layerGroupRef.current = null;
      markerRefs.current = {};
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const group = layerGroupRef.current;
    if (!map || !group || !day) return;

    group.clearLayers();
    markerRefs.current = {};

    const coords = [];

    day.items.forEach((item, itemIndex) => {
      const latLng = [item.lat, item.lng];
      coords.push(latLng);

      const marker = L.circleMarker(latLng, {
        radius: 8,
        color: "#ffffff",
        weight: 2,
        fillColor: day.accent,
        fillOpacity: 1,
        stroke: true
      }).addTo(group);

      marker.bindTooltip(`${itemIndex + 1}. ${item.title}`, {
        direction: "top",
        offset: [0, -8]
      });

      marker.on("click", () => {
        onSelectRef.current(item);
      });

      marker.on("mouseover", () => {
        marker.setStyle({ radius: 10, weight: 3 });
      });

      marker.on("mouseout", () => {
        marker.setStyle({ radius: activeItem?.id === item.id ? 10 : 8, weight: activeItem?.id === item.id ? 3 : 2 });
      });

      markerRefs.current[item.id] = marker;
    });

    if (coords.length > 1) {
      L.polyline(coords, {
        color: day.accent,
        weight: 4,
        opacity: 0.58,
        lineJoin: "round",
        dashArray: "6 6"
      }).addTo(group);
    }

    if (coords.length) {
      map.fitBounds(L.latLngBounds(coords), {
        padding: [48, 48],
        maxZoom: 14,
        animate: true,
        duration: 0.65
      });
    }

    if (activeItem) {
      const marker = markerRefs.current[activeItem.id];
      if (marker) {
        marker.setStyle({ radius: 10, weight: 3 });
      }
    }
  }, [day, activeItem]);

  useEffect(() => {
    if (!activeItem || !mapRef.current) return;

    if (previousDayIdRef.current !== day?.id) {
      previousDayIdRef.current = day?.id;
      return;
    }

    Object.values(markerRefs.current).forEach((marker) => {
      marker.setStyle({ radius: 8, weight: 2 });
    });

    const marker = markerRefs.current[activeItem.id];
    if (marker) {
      marker.setStyle({ radius: 10, weight: 3 });
    }

    mapRef.current.flyTo([activeItem.lat, activeItem.lng], 15, {
      duration: 0.65
    });
  }, [activeItem, day?.id]);

  useEffect(() => {
    const handleResize = () => {
      mapRef.current?.invalidateSize();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div ref={containerRef} id="map" />;
}

export default TravelMap;
