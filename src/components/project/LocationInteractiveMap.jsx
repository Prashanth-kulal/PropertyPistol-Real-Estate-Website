"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ZoomIn,
  ZoomOut,
  Compass,
  RotateCcw,
  Maximize2,
  Navigation,
  MapPin,
  Building2,
  Home,
  Briefcase,
  Trees,
  Layers,
  Sparkles,
} from "lucide-react";

// Inline SVG helper generators for Leaflet divIcon HTML strings
function getProjectPinSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`;
}

function getPropertyTypeSvg(typeKey) {
  switch (typeKey) {
    case "apartments":
      return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>`;
    case "houses":
      return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
    case "commercial":
      return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>`;
    case "land":
      return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 10v.01"/><path d="M14 14v.01"/><path d="M14 10v.01"/><path d="M10 14v.01"/><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`;
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
  }
}

function getLandmarkSvg(category) {
  switch (category) {
    case "Hospitals":
      return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`;
    case "Schools":
      return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`;
    case "Parks":
      return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.4"/></svg>`;
    case "Shopping Centers":
      return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;
    case "Transport":
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="15" r="1"/></svg>`;
  }
}

export default function LocationInteractiveMap({
  project,
  center,
  activeMode = "landmarks", // 'landmarks' | 'properties'
  landmarks = [],
  properties = [],
  selectedItemId = null,
  onSelectItem,
  showPropertiesOverlay = false,
  showLandmarksOverlay = false,
  className = "",
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersGroupRef = useRef(null);
  const markersByIdRef = useRef({});
  const [mapReady, setMapReady] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(14);

  const defaultCenter = center || { lat: 19.0624, lng: 73.0108 };

  // 1. Initialize Leaflet Map
  useEffect(() => {
    let isMounted = true;
    let leafletMap = null;

    if (!containerRef.current) return;

    // Dynamically load leaflet in browser
    import("leaflet").then((leafletModule) => {
      if (!isMounted || !containerRef.current) return;
      const L = leafletModule.default || leafletModule;

      // Clean existing instance if any
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      // Initialize Map instance
      const map = L.map(containerRef.current, {
        center: [defaultCenter.lat, defaultCenter.lng],
        zoom: 14,
        zoomControl: false, // We supply custom sleek controls
        scrollWheelZoom: true,
      });

      leafletMap = map;
      mapRef.current = map;

      // High-performance OpenStreetMap Tile Layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
        maxZoom: 19,
        minZoom: 9,
      }).addTo(map);

      // Create LayerGroup for markers
      const layerGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = layerGroup;

      map.on("zoomend", () => {
        if (isMounted) setZoomLevel(map.getZoom());
      });

      if (isMounted) setMapReady(true);
    });

    return () => {
      isMounted = false;
      if (leafletMap) {
        leafletMap.remove();
        mapRef.current = null;
      }
    };
  }, [defaultCenter.lat, defaultCenter.lng]);

  // 2. Render Markers onto the Map whenever activeMode, landmarks, or properties change
  useEffect(() => {
    if (!mapReady || !mapRef.current || !markersGroupRef.current) return;

    import("leaflet").then((leafletModule) => {
      const L = leafletModule.default || leafletModule;
      const map = mapRef.current;
      const layerGroup = markersGroupRef.current;

      layerGroup.clearLayers();
      markersByIdRef.current = {};

      const currentProjTitle = project?.title || "Property";
      const currentProjLoc = project?.location || "Prime Location";
      const currentProjPrice = project?.price ? `₹${project.price}*` : "";
      const currentProjSlug = project?.slug || "godrej-eternal-palms";
      const currentProjImg =
        project?.images?.[0] ||
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80";

      // ── Current Project Marker (Prominent Gold/Orange Pulsing Pin) ──
      const projectIconHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group" style="transform: translate(-50%, -100%);">
          <!-- Beacon pulse ring -->
          <span class="absolute -inset-2.5 rounded-full bg-[#EA580C]/40 animate-ping"></span>
          <!-- Main Pin Badge -->
          <div class="relative z-10 flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#EA580C] to-[#C2410C] text-white shadow-2xl border-2 border-white transition-all transform group-hover:scale-110">
            ${getProjectPinSvg()}
          </div>
          <!-- Pin arrow -->
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#C2410C] border-r-2 border-b-2 border-white shadow-xs"></div>
          <!-- Floating Project Tag -->
          <div class="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#252525] text-white text-[10px] font-extrabold shadow-md pointer-events-none flex items-center gap-1 border border-white/20">
            <span class="w-1.5 h-1.5 rounded-full bg-[#EA580C]"></span>
            <span>Current Project</span>
          </div>
        </div>
      `;

      const projectDivIcon = L.divIcon({
        className: "custom-current-project-marker",
        html: projectIconHtml,
        iconSize: [44, 44],
        iconAnchor: [0, 0],
        popupAnchor: [0, -48],
      });

      const projectPopupHtml = `
        <div class="w-[280px] overflow-hidden rounded-2xl bg-white text-[#252525] font-sans">
          <div class="relative h-28 w-full overflow-hidden bg-gray-100">
            <img src="${currentProjImg}" alt="${currentProjTitle}" class="w-full h-full object-cover" />
            <span class="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#EA580C] text-white shadow">
              Current Project
            </span>
            <span class="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/60 text-white backdrop-blur-sm">
              0% Brokerage
            </span>
          </div>
          <div class="p-3.5 space-y-2">
            <div>
              <h4 class="text-sm font-extrabold text-[#252525] leading-tight truncate">${currentProjTitle}</h4>
              <p class="text-[11px] text-[#6B7280] truncate mt-0.5">
                ${currentProjLoc}
              </p>
            </div>
            <div class="flex items-center justify-between border-t border-[#E8E3DA] pt-2 text-xs">
              <div>
                <span class="text-[9px] text-[#6B7280] block uppercase tracking-wider font-semibold">Starting Price</span>
                <span class="text-sm font-black text-[#EA580C]">${currentProjPrice}</span>
              </div>
              <div class="text-right">
                <span class="text-[9px] text-[#6B7280] block uppercase tracking-wider font-semibold">Developer</span>
                <span class="text-xs font-bold text-[#252525] truncate">${project?.builder || "Developer"}</span>
              </div>
            </div>
            <div class="pt-1">
              <a href="https://maps.google.com/?q=${encodeURIComponent(
                currentProjTitle + ", " + currentProjLoc
              )}" target="_blank" rel="noopener noreferrer" class="w-full py-1.5 px-3 rounded-lg bg-[#FAF8F4] hover:bg-[#FBF1DF] border border-[#E8E3DA] text-[#AE7419] text-xs font-bold text-center block transition-colors">
                Directions in Google Maps →
              </a>
            </div>
          </div>
        </div>
      `;

      const projectMarker = L.marker([defaultCenter.lat, defaultCenter.lng], {
        icon: projectDivIcon,
        zIndexOffset: 1000,
      })
        .addTo(layerGroup)
        .bindPopup(projectPopupHtml);

      markersByIdRef.current["current-project"] = projectMarker;

      // ── Nearby Landmarks Markers ──
      // Display if activeMode === "landmarks" OR showLandmarksOverlay is enabled
      const shouldRenderLandmarks =
        activeMode === "landmarks" || showLandmarksOverlay;

      if (shouldRenderLandmarks && landmarks.length > 0) {
        landmarks.forEach((lm) => {
          if (!lm.lat || !lm.lng) return;

          let colorBg = "bg-indigo-600";
          let borderCol = "border-indigo-600";
          let badgeTextCol = "text-indigo-700 bg-indigo-50";

          switch (lm.category) {
            case "Hospitals":
              colorBg = "bg-rose-500";
              borderCol = "border-rose-500";
              badgeTextCol = "text-rose-700 bg-rose-50";
              break;
            case "Schools":
              colorBg = "bg-blue-600";
              borderCol = "border-blue-600";
              badgeTextCol = "text-blue-700 bg-blue-50";
              break;
            case "Parks":
              colorBg = "bg-emerald-600";
              borderCol = "border-emerald-600";
              badgeTextCol = "text-emerald-700 bg-emerald-50";
              break;
            case "Shopping Centers":
              colorBg = "bg-amber-500";
              borderCol = "border-amber-500";
              badgeTextCol = "text-amber-700 bg-amber-50";
              break;
            case "Transport":
            default:
              colorBg = "bg-indigo-600";
              borderCol = "border-indigo-600";
              badgeTextCol = "text-indigo-700 bg-indigo-50";
              break;
          }

          const landmarkHtml = `
            <div class="relative flex items-center justify-center cursor-pointer group" style="transform: translate(-50%, -100%);">
              <div class="w-8 h-8 rounded-full ${colorBg} text-white flex items-center justify-center shadow-lg border-2 border-white transition-transform group-hover:scale-125">
                ${getLandmarkSvg(lm.category)}
              </div>
              <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${colorBg} border-r border-b border-white"></div>
              <!-- Tooltip on hover -->
              <div class="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md bg-[#252525] text-white text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md z-30">
                ${lm.name} (${lm.distance})
              </div>
            </div>
          `;

          const lmDivIcon = L.divIcon({
            className: "custom-landmark-marker",
            html: landmarkHtml,
            iconSize: [32, 32],
            iconAnchor: [0, 0],
            popupAnchor: [0, -36],
          });

          const lmPopupHtml = `
            <div class="w-[260px] p-3 space-y-2 rounded-xl bg-white text-[#252525] font-sans">
              <div class="flex items-start gap-2.5">
                <div class="w-7 h-7 rounded-lg ${colorBg} text-white flex items-center justify-center shrink-0 mt-0.5">
                  ${getLandmarkSvg(lm.category)}
                </div>
                <div class="min-w-0">
                  <span class="text-[9px] font-bold uppercase tracking-wider ${badgeTextCol} px-1.5 py-0.5 rounded inline-block mb-0.5">
                    ${lm.category}
                  </span>
                  <h4 class="text-xs font-bold text-[#252525] truncate">${lm.name}</h4>
                  <span class="text-[10px] text-[#6B7280] block">${lm.type}</span>
                </div>
              </div>
              <div class="flex items-center justify-between text-xs pt-2 border-t border-[#E8E3DA]">
                <span class="text-[11px] text-[#6B7280]">Distance</span>
                <span class="font-extrabold text-[#AE7419]">${lm.distance} · ${lm.time}</span>
              </div>
              <a href="https://maps.google.com/?q=${encodeURIComponent(
                lm.name + ", " + currentProjLoc
              )}" target="_blank" rel="noopener noreferrer" class="block w-full text-center py-1.5 rounded-lg bg-[#FAF8F4] hover:bg-[#FBF1DF] text-[11px] font-bold text-[#AE7419] border border-[#E8E3DA] transition-colors">
                Open in Google Maps →
              </a>
            </div>
          `;

          const marker = L.marker([lm.lat, lm.lng], {
            icon: lmDivIcon,
            zIndexOffset: 300,
          })
            .addTo(layerGroup)
            .bindPopup(lmPopupHtml);

          marker.on("click", () => {
            if (onSelectItem) onSelectItem(lm);
          });

          markersByIdRef.current[lm.id] = marker;
        });
      }

      // ── Surrounding Properties & Land/Plot Markers ──
      // Display if activeMode === "properties" OR showPropertiesOverlay is enabled
      const shouldRenderProperties =
        activeMode === "properties" || showPropertiesOverlay;

      if (shouldRenderProperties && properties.length > 0) {
        properties.forEach((prop) => {
          // Skip if current project (already rendered prominently)
          if (prop.isCurrentProject) return;
          if (!prop.lat || !prop.lng) return;

          let badgeColor = "bg-blue-600 text-white";
          let borderCol = "border-blue-600";
          let typeColor = "text-blue-700 bg-blue-50";

          switch (prop.propertyTypeKey) {
            case "apartments":
              badgeColor = "bg-blue-600 text-white";
              borderCol = "border-blue-600";
              typeColor = "text-blue-700 bg-blue-50";
              break;
            case "houses":
              badgeColor = "bg-purple-600 text-white";
              borderCol = "border-purple-600";
              typeColor = "text-purple-700 bg-purple-50";
              break;
            case "commercial":
              badgeColor = "bg-indigo-600 text-white";
              borderCol = "border-indigo-600";
              typeColor = "text-indigo-700 bg-indigo-50";
              break;
            case "land":
              badgeColor = "bg-emerald-600 text-white";
              borderCol = "border-emerald-600";
              typeColor = "text-emerald-700 bg-emerald-50";
              break;
            default:
              badgeColor = "bg-amber-600 text-white";
              borderCol = "border-amber-600";
              typeColor = "text-amber-700 bg-amber-50";
              break;
          }

          const propMarkerHtml = `
            <div class="relative flex flex-col items-center cursor-pointer group" style="transform: translate(-50%, -100%);">
              <!-- Compact property tag with type icon & price -->
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white shadow-xl border-2 ${borderCol} text-[11px] font-extrabold text-[#252525] group-hover:scale-110 transition-transform">
                <span class="w-5 h-5 rounded-md ${badgeColor} flex items-center justify-center shrink-0 shadow-xs">
                  ${getPropertyTypeSvg(prop.propertyTypeKey)}
                </span>
                <span class="truncate max-w-[85px] leading-tight font-black">${prop.price}</span>
              </div>
              <div class="w-2.5 h-2.5 rotate-45 bg-white border-r-2 border-b-2 ${borderCol} -mt-1.5 shadow-xs"></div>
            </div>
          `;

          const propDivIcon = L.divIcon({
            className: "custom-property-marker",
            html: propMarkerHtml,
            iconSize: [80, 32],
            iconAnchor: [0, 0],
            popupAnchor: [0, -38],
          });

          const propPopupHtml = `
            <div class="w-[280px] sm:w-[300px] overflow-hidden rounded-2xl bg-white text-[#252525] font-sans">
              <div class="relative h-28 w-full overflow-hidden bg-gray-100">
                <img src="${prop.image}" alt="${prop.title}" class="w-full h-full object-cover" />
                <span class="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold ${typeColor} shadow-xs">
                  ${prop.propertyType}
                </span>
                ${
                  prop.isLand
                    ? '<span class="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600 text-white shadow">Land / Plot</span>'
                    : ""
                }
              </div>
              <div class="p-3.5 space-y-2">
                <div>
                  <h4 class="text-sm font-extrabold text-[#252525] leading-tight truncate">${prop.title}</h4>
                  <p class="text-[11px] text-[#6B7280] truncate mt-0.5">
                    ${prop.locality}
                  </p>
                </div>
                <div class="flex items-center justify-between border-t border-[#E8E3DA] pt-2 text-xs">
                  <div>
                    <span class="text-[9px] text-[#6B7280] block uppercase tracking-wider font-semibold">Starting Price</span>
                    <span class="text-sm font-black text-[#EA580C]">${prop.price}</span>
                  </div>
                  <div class="text-right">
                    <span class="text-[9px] text-[#6B7280] block uppercase tracking-wider font-semibold">Specs</span>
                    <span class="text-xs font-bold text-[#252525] truncate">${prop.specs || "On Request"}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2 pt-1">
                  <a href="/projects/${prop.slug}" class="flex-1 py-1.5 px-3 rounded-lg bg-[#EA580C] hover:bg-[#c2410c] text-white text-xs font-bold text-center transition-colors block shadow-xs">
                    View Details →
                  </a>
                  <a href="https://maps.google.com/?q=${encodeURIComponent(
                    prop.title + ", " + prop.locality
                  )}" target="_blank" rel="noopener noreferrer" class="p-1.5 rounded-lg border border-[#E8E3DA] hover:border-[#EA580C] text-[#6B7280] hover:text-[#EA580C] transition-colors" title="Google Maps Directions">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                  </a>
                </div>
              </div>
            </div>
          `;

          const marker = L.marker([prop.lat, prop.lng], {
            icon: propDivIcon,
            zIndexOffset: 500,
          })
            .addTo(layerGroup)
            .bindPopup(propPopupHtml);

          marker.on("click", () => {
            if (onSelectItem) onSelectItem(prop);
          });

          markersByIdRef.current[prop.id] = marker;
        });
      }
    });
  }, [
    mapReady,
    activeMode,
    landmarks,
    properties,
    project,
    defaultCenter.lat,
    defaultCenter.lng,
    showPropertiesOverlay,
    showLandmarksOverlay,
    onSelectItem,
  ]);

  // 3. Pan and open popup when `selectedItemId` changes
  useEffect(() => {
    if (!mapReady || !mapRef.current || !selectedItemId) return;
    const targetMarker = markersByIdRef.current[selectedItemId];
    if (targetMarker) {
      const latLng = targetMarker.getLatLng();
      mapRef.current.panTo(latLng, { animate: true, duration: 0.6 });
      setTimeout(() => {
        targetMarker.openPopup();
      }, 300);
    }
  }, [selectedItemId, mapReady]);

  // 4. Map Control Handlers
  const handleZoomIn = useCallback(() => {
    if (mapRef.current) mapRef.current.zoomIn();
  }, []);

  const handleZoomOut = useCallback(() => {
    if (mapRef.current) mapRef.current.zoomOut();
  }, []);

  const handleRecenter = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.flyTo([defaultCenter.lat, defaultCenter.lng], 14, {
        animate: true,
        duration: 0.8,
      });
      const projectMarker = markersByIdRef.current["current-project"];
      if (projectMarker) {
        setTimeout(() => projectMarker.openPopup(), 600);
      }
    }
  }, [defaultCenter.lat, defaultCenter.lng]);

  const handleFitBounds = useCallback(() => {
    if (!mapRef.current) return;
    import("leaflet").then((leafletModule) => {
      const L = leafletModule.default || leafletModule;
      const allMarkers = Object.values(markersByIdRef.current);
      if (allMarkers.length === 0) return;
      const group = L.featureGroup(allMarkers);
      mapRef.current.fitBounds(group.getBounds(), { padding: [50, 50] });
    });
  }, []);

  return (
    <div
      className={`relative w-full h-full min-h-[400px] sm:min-h-[460px] rounded-2xl overflow-hidden border border-[#E8E3DA] bg-[#FAF8F4] shadow-inner select-none ${className}`}
    >
      {/* Map DOM target */}
      <div ref={containerRef} className="w-full h-full min-h-[400px] sm:min-h-[460px]" />

      {/* Floating Zoom & Map Navigation Controls */}
      <div className="absolute top-3 right-3 z-[400] flex flex-col gap-1.5 pointer-events-auto">
        <button
          type="button"
          onClick={handleZoomIn}
          title="Zoom In"
          aria-label="Zoom In"
          className="w-9 h-9 rounded-xl bg-white/95 hover:bg-white text-[#252525] hover:text-[#EA580C] shadow-md border border-[#E8E3DA] flex items-center justify-center transition-all cursor-pointer"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          title="Zoom Out"
          aria-label="Zoom Out"
          className="w-9 h-9 rounded-xl bg-white/95 hover:bg-white text-[#252525] hover:text-[#EA580C] shadow-md border border-[#E8E3DA] flex items-center justify-center transition-all cursor-pointer"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleRecenter}
          title="Recenter on Project"
          aria-label="Recenter on Project"
          className="w-9 h-9 rounded-xl bg-white/95 hover:bg-white text-[#252525] hover:text-[#EA580C] shadow-md border border-[#E8E3DA] flex items-center justify-center transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={handleFitBounds}
          title="Fit All Visible Markers"
          aria-label="Fit All Markers"
          className="w-9 h-9 rounded-xl bg-white/95 hover:bg-white text-[#252525] hover:text-[#EA580C] shadow-md border border-[#E8E3DA] flex items-center justify-center transition-all cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Floating Legend / Project Indicator */}
      <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-[#E8E3DA] shadow-lg pointer-events-auto max-w-[270px] sm:max-w-xs transition-all">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#EA580C] to-[#C2410C] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs font-black text-[#252525] block truncate leading-tight">
              {project?.title || "Property"}
            </span>
            <span className="text-[10px] text-[#6B7280] block truncate">
              {project?.location || "Sanpada, Navi Mumbai"}
            </span>
          </div>
          <button
            type="button"
            onClick={handleRecenter}
            className="px-2 py-1 rounded-md bg-[#FAF8F4] hover:bg-[#FBF1DF] text-[10px] font-bold text-[#AE7419] border border-[#E8E3DA] transition-all cursor-pointer shrink-0"
          >
            Center
          </button>
        </div>
      </div>

      {/* Active Layer Badge */}
      <div className="absolute top-3 left-3 z-[400] pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#E8E3DA] shadow-sm text-[11px] font-bold text-[#252525]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>
            {activeMode === "landmarks"
              ? `Nearby Landmarks (${landmarks.length})`
              : `Locate Properties & Land (${properties.length})`}
          </span>
        </div>
      </div>
    </div>
  );
}
