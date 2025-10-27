import React, { useState } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "sonner";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationMaop = ({ location }) => {
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMap, setShowingMap] = useState(false);

  const openCageApi = import.meta.env.VITE_OPENCAGE_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    location
  )}&key=${openCageApi}`;

  const handleShowMap = async () => {
    if (!location) {
      toast.error("No Location Found");
    }

    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setCoords({ lat, lng });
        setAddress(data.results[0].formatted);
        setShowingMap(true);
      } else {
        toast.error("Location Not Found");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMap = () => {
    if (coords) {
      setShowingMap((prev) => !prev);
    } else {
      handleShowMap();
    }
  };
  return (
    <div>
      <div className="my-1 w-full ">
        <div className="w-[250px]">
          <button
            onClick={toggleMap}
            disabled={loading}
            className="px-1 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 disabled:opacity-60"
          >
            {loading ? "Loading map..." : showMap ? "Hide Map" : "Show on Map"}
          </button>
        </div>

        {showMap && coords && (
          <div
            className="h-[400px] w-full rounded-lg overflow-hidden shadow-md mt-1   "
            style={{ display: showMap ? "flex" : "none" }}
          >
            <MapContainer
              center={[coords.lat, coords.lng]}
              zoom={13} 
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
              <Marker position={[coords.lat, coords.lng]}>
                <Popup>{address}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationMaop;
