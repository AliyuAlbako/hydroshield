// import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { useRef } from "react";

// interface NigeriaMapProps {
//   nigeriaGeoJson: any;
// }

// export default function NigeriaMap({ nigeriaGeoJson }: NigeriaMapProps) {
//   const geoJsonRef = useRef<L.GeoJSON>(null);

//   return (
//     <MapContainer
//       center={[9.082, 8.6753]}
//       zoom={6}
//       style={{ height: "500px", width: "100%" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="© OpenStreetMap contributors"
//       />

//       <GeoJSON
//         data={nigeriaGeoJson}
//         ref={geoJsonRef}
//         onEachFeature={(feature: { properties: { name: any; }; }, layer: { on: (arg0: { click: () => void; mouseover: (e: any) => void; mouseout: (e: any) => void; }) => any; }) => layer.on({
//           click: () => {
//             console.log("Clicked State:", feature.properties?.name);
//           },
//           mouseover: (e: { target: any; }) => {
//             const layer = e.target;
//             layer.setStyle({
//               weight: 2,
//               fillOpacity: 0.7,
//             });
//           },
//           mouseout: (e: { target: any; }) => {
//             geoJsonRef.current?.resetStyle(e.target);
//           },
//         })}
//       />
//     </MapContainer>
//   );
// }
