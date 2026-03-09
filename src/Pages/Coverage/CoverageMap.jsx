import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import District from '/src/assets/District.json'
import { useEffect } from "react";

//  DEFAULT ICON
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// ZOOM CONTROLLER
const ZoomToDistrict = ({ selected }) => {
  const map = useMap();

  useEffect(() => {
    if (selected) {
      map.flyTo([selected.latitude, selected.longitude], 12 , {
        duration: 1.5,
      });
    }
  }, [selected, map]);

  return null;
};

const CoverageMap = ({ selectedDistrict }) => {
  return (
    <div className="w-full h-137.5 rounded-xl overflow-hidden shadow mt-8">
      <MapContainer
        center={[23.685, 90.3563]} // Bangladesh Center
        zoom={7}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* SEARCH ZOOM */}
        <ZoomToDistrict selected={selectedDistrict} />

        {/* MARKERS */}
        {District.map((d, index) => (
          <Marker key={index} position={[d.latitude, d.longitude]}>

            {/* HOVER INFO (UPDATED) */}
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              <div className="text-xs">
                <strong>{d.district}</strong>
                <br />
                <span className="text-gray-500">Covered Areas:</span>
                <ul className="ml-4 max-h-20 overflow-y-auto">
                  {d.covered_area.map((area, i) => (
                    <li key={i}>{area}</li>
                  ))}
                </ul>
              </div>
            </Tooltip>

            {/* CLICK DETAILS */}
            <Popup>
              <strong>{d.district}</strong>
              <br />
              Covered Areas:
              <ul>
                {d.covered_area.map((area, i) => (
                  <li key={i}>{area}</li>
                ))}
              </ul>
            </Popup>

          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CoverageMap;
