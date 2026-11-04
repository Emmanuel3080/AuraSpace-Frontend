import React, { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "sonner";
import { MapPinIcon } from "../Common/Icons";

/**
 * Known landmark and city coordinates database.
 * Used for instant, ultra-reliable venue resolution without external network rate-limits.
 */
const KNOWN_VENUES = [
  // Landmark Centre & Beach
  {
    regex: /landmark\s*(centre|center|beach|village|event)/i,
    coords: { lat: 6.4253, lng: 3.4441 },
    label: "Landmark Centre, Water Corporation Drive, Victoria Island, Lagos",
  },
  // Eko Hotel & Suites / Convention Centre
  {
    regex: /eko\s*(hotel|convention|suites)/i,
    coords: { lat: 6.4267, lng: 3.4309 },
    label: "Eko Hotel & Suites, Victoria Island, Lagos",
  },
  // Muson Centre
  {
    regex: /muson\s*(centre|center)/i,
    coords: { lat: 6.4447, lng: 3.4026 },
    label: "MUSON Centre, Onikan, Lagos",
  },
  // Balmoral Convention Centre
  {
    regex: /balmoral\s*(convention|hall|centre|center)/i,
    coords: { lat: 6.4265, lng: 3.4312 },
    label: "Balmoral Convention Centre, Lagos",
  },
  // Tafawa Balewa Square (TBS)
  {
    regex: /tafawa\s*balewa|\btbs\b/i,
    coords: { lat: 6.4497, lng: 3.4019 },
    label: "Tafawa Balewa Square, Lagos",
  },
  // Civic Centre Lagos
  {
    regex: /civic\s*(centre|center)/i,
    coords: { lat: 6.4385, lng: 3.4286 },
    label: "Civic Centre, Ozumba Mbadiwe, Lagos",
  },
  // Harbour Point
  {
    regex: /harbour\s*point/i,
    coords: { lat: 6.4312, lng: 3.4294 },
    label: "Harbour Point, Victoria Island, Lagos",
  },
  // Federal Palace Hotel
  {
    regex: /federal\s*palace/i,
    coords: { lat: 6.4287, lng: 3.4144 },
    label: "Federal Palace Hotel, Victoria Island, Lagos",
  },
  // Hard Rock Cafe / The Good Beach
  {
    regex: /hard\s*rock\s*cafe|the\s*good\s*beach/i,
    coords: { lat: 6.4245, lng: 3.4468 },
    label: "Landmark Village, Victoria Island, Lagos",
  },
  // Zone Tech Park / Gbagada
  {
    regex: /zone\s*tech\s*park/i,
    coords: { lat: 6.5562, lng: 3.3857 },
    label: "Zone Tech Park, Gbagada, Lagos",
  },
  // Radisson Blu Anchorage
  {
    regex: /radisson\s*blu.*anchorage/i,
    coords: { lat: 6.4348, lng: 3.4191 },
    label: "Radisson Blu Anchorage, Lagos",
  },
  // Abuja International Conference Centre (ICC)
  {
    regex: /international\s*conference\s*centre.*abuja|\babuja\s*icc\b/i,
    coords: { lat: 9.0531, lng: 7.4898 },
    label: "International Conference Centre, Abuja",
  },
  // Transcorp Hilton Abuja
  {
    regex: /transcorp\s*hilton/i,
    coords: { lat: 9.0765, lng: 7.4984 },
    label: "Transcorp Hilton, Maitama, Abuja",
  },
  // Shehu Musa Yar'Adua Centre
  {
    regex: /yar'?adua\s*(centre|center)/i,
    coords: { lat: 9.0558, lng: 7.4842 },
    label: "Shehu Musa Yar'Adua Centre, Abuja",
  },
  // Common Areas & Neighborhoods
  {
    regex: /\bvictoria\s*island\b|\bvi\b/i,
    coords: { lat: 6.4281, lng: 3.4219 },
    label: "Victoria Island, Lagos",
  },
  {
    regex: /\blekki\s*(phase\s*1)?\b/i,
    coords: { lat: 6.4474, lng: 3.4723 },
    label: "Lekki, Lagos",
  },
  {
    regex: /\bikoyi\b/i,
    coords: { lat: 6.4549, lng: 3.4339 },
    label: "Ikoyi, Lagos",
  },
  {
    regex: /\bikeja\b/i,
    coords: { lat: 6.5964, lng: 3.3431 },
    label: "Ikeja, Lagos",
  },
  {
    regex: /\byaba\b/i,
    coords: { lat: 6.5095, lng: 3.3711 },
    label: "Yaba, Lagos",
  },
  // Major Cities
  {
    regex: /\blagos\b/i,
    coords: { lat: 6.5244, lng: 3.3792 },
    label: "Lagos, Nigeria",
  },
  {
    regex: /\babuja\b/i,
    coords: { lat: 9.0765, lng: 7.3986 },
    label: "Abuja, Nigeria",
  },
  {
    regex: /\bport\s*harcourt\b/i,
    coords: { lat: 4.8156, lng: 7.0498 },
    label: "Port Harcourt, Nigeria",
  },
  {
    regex: /\bibadan\b/i,
    coords: { lat: 7.3775, lng: 3.947 },
    label: "Ibadan, Nigeria",
  },
  {
    regex: /\benugu\b/i,
    coords: { lat: 6.4584, lng: 7.5464 },
    label: "Enugu, Nigeria",
  },
  {
    regex: /\baccra\b/i,
    coords: { lat: 5.6037, lng: -0.187 },
    label: "Accra, Ghana",
  },
  {
    regex: /\blondon\b/i,
    coords: { lat: 51.5074, lng: -0.1278 },
    label: "London, United Kingdom",
  },
  {
    regex: /\bnew\s*york\b/i,
    coords: { lat: 40.7128, lng: -74.006 },
    label: "New York, USA",
  },
];

/**
 * Creates a clean, self-contained SVG map marker icon matching Auraspace branding.
 * Avoids broken external PNG asset links.
 */
const createAuraspaceMarkerIcon = () => {
  return L.divIcon({
    className: "auraspace-map-pin",
    html: `
      <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; cursor: pointer;">
        <span style="position: absolute; width: 44px; height: 44px; border-radius: 50%; background: rgba(128, 101, 232, 0.28); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
        <div style="position: relative; z-index: 10; width: 34px; height: 34px; border-radius: 50%; background: #111827; border: 2.5px solid #8065E8; box-shadow: 0 8px 16px rgba(17, 24, 39, 0.35); display: flex; align-items: center; justify-content: center; color: white;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3" fill="#F45B69"></circle>
          </svg>
        </div>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -24],
  });
};

/**
 * Helper component that forces Leaflet to recalculate container dimensions.
 * Fixes the classic Leaflet grey/blank tiles issue when rendered inside tabs or delayed mounts.
 */
const MapResizer = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    map.invalidateSize();

    if (coords && coords.lat && coords.lng) {
      map.setView([coords.lat, coords.lng], map.getZoom() || 14);
    }

    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => clearTimeout(timer);
  }, [map, coords]);

  return null;
};

/**
 * Safely parses event location into structured components:
 * Venue Name, Full Address, and City.
 */
export const parseLocationDetails = (event, rawLocation) => {
  let locationStr = "";

  if (typeof rawLocation === "string") {
    locationStr = rawLocation.trim();
  } else if (rawLocation && typeof rawLocation === "object") {
    locationStr = rawLocation.name || rawLocation.address || rawLocation.venue || "";
  } else if (typeof event?.location === "string") {
    locationStr = event.location.trim();
  } else if (event?.location && typeof event.location === "object") {
    locationStr = event.location.name || event.location.address || event.location.venue || "";
  }

  // Check if unspecified, TBA, or empty
  const isUnspecified =
    !locationStr ||
    /^(tba|venue tba|location tba|to be announced|not specified|none|n\/a|pending)$/i.test(
      locationStr
    );

  if (isUnspecified) {
    return {
      venue: "Location not specified",
      address: "",
      city: "",
      fullText: "Location not specified",
      isSpecified: false,
      isVirtual: false,
    };
  }

  // Check for virtual or online experiences
  const isVirtual =
    /^(online|virtual|zoom|google meet|remote|live stream|webinar)/i.test(locationStr) ||
    Boolean(event?.isVirtual) ||
    event?.category === "Virtual";

  if (isVirtual) {
    return {
      venue: "Online Experience",
      address: locationStr,
      city: "Virtual",
      fullText: locationStr,
      isSpecified: true,
      isVirtual: true,
    };
  }

  // Prefer explicit structured attributes if present on event
  const explicitVenue = event?.venue || event?.venueName || event?.venue_name;
  const explicitAddress = event?.address || event?.fullAddress;
  const explicitCity = event?.city;

  // Split string into venue, address, city
  const parts = locationStr
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  let venue = explicitVenue || "";
  let address = explicitAddress || "";
  let city = explicitCity || "";

  if (parts.length >= 3) {
    if (!venue) venue = parts[0];
    if (!address) address = parts.slice(0, parts.length - 1).join(", ");
    if (!city) city = parts[parts.length - 1];
  } else if (parts.length === 2) {
    if (!venue) venue = parts[0];
    if (!address) address = parts[0];
    if (!city) city = parts[1];
  } else if (parts.length === 1) {
    if (!venue) venue = parts[0];
    if (!address) address = parts[0];
  }

  return {
    venue: venue || locationStr,
    address: address || venue || locationStr,
    city: city,
    fullText: locationStr,
    isSpecified: true,
    isVirtual: false,
  };
};

/**
 * Extracts saved event coordinates directly from event data if available.
 */
export const extractCoordinates = (event) => {
  if (!event) return null;

  // Direct latitude & longitude props
  if (
    event.latitude !== undefined &&
    event.longitude !== undefined &&
    !isNaN(Number(event.latitude)) &&
    !isNaN(Number(event.longitude))
  ) {
    return {
      lat: Number(event.latitude),
      lng: Number(event.longitude),
      source: "saved_coordinates",
    };
  }

  if (
    event.lat !== undefined &&
    event.lng !== undefined &&
    !isNaN(Number(event.lat)) &&
    !isNaN(Number(event.lng))
  ) {
    return {
      lat: Number(event.lat),
      lng: Number(event.lng),
      source: "saved_coordinates",
    };
  }

  // Coordinates array [lat, lng] or [lng, lat]
  if (Array.isArray(event.coordinates) && event.coordinates.length === 2) {
    const [c1, c2] = event.coordinates.map(Number);
    if (!isNaN(c1) && !isNaN(c2)) {
      if (Math.abs(c2) <= 90 && Math.abs(c1) <= 180) {
        return { lat: c2, lng: c1, source: "saved_coordinates" };
      }
      return { lat: c1, lng: c2, source: "saved_coordinates" };
    }
  }

  // Coordinates object
  if (event.coordinates && typeof event.coordinates === "object") {
    const lat = Number(event.coordinates.lat || event.coordinates.latitude);
    const lng = Number(event.coordinates.lng || event.coordinates.longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      return { lat, lng, source: "saved_coordinates" };
    }
  }

  // Location object coordinates
  if (event.location && typeof event.location === "object") {
    if (
      event.location.latitude !== undefined &&
      event.location.longitude !== undefined
    ) {
      return {
        lat: Number(event.location.latitude),
        lng: Number(event.location.longitude),
        source: "saved_coordinates",
      };
    }
    if (event.location.lat !== undefined && event.location.lng !== undefined) {
      return {
        lat: Number(event.location.lat),
        lng: Number(event.location.lng),
        source: "saved_coordinates",
      };
    }
    if (
      Array.isArray(event.location.coordinates) &&
      event.location.coordinates.length === 2
    ) {
      const [c1, c2] = event.location.coordinates.map(Number);
      if (!isNaN(c1) && !isNaN(c2)) {
        if (Math.abs(c2) <= 90 && Math.abs(c1) <= 180) {
          return { lat: c2, lng: c1, source: "saved_coordinates" };
        }
        return { lat: c1, lng: c2, source: "saved_coordinates" };
      }
    }
  }

  // Geo or Geolocation object
  if (event.geo && typeof event.geo === "object") {
    const lat = Number(event.geo.lat || event.geo.latitude);
    const lng = Number(event.geo.lng || event.geo.longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      return { lat, lng, source: "saved_coordinates" };
    }
  }

  return null;
};

const LocationMap = ({ location, event }) => {
  const locationDetails = useMemo(
    () => parseLocationDetails(event, location),
    [event, location]
  );

  const [coords, setCoords] = useState(null);
  const [resolvedAddress, setResolvedAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    // Rule: If location is unspecified or virtual, do not attempt geocoding
    if (!locationDetails.isSpecified || locationDetails.isVirtual) {
      setCoords(null);
      setResolvedAddress("");
      setLoading(false);
      return;
    }

    // 1. Check for saved event coordinates first (highest priority)
    const savedCoords = extractCoordinates(event);
    if (savedCoords) {
      setCoords(savedCoords);
      setResolvedAddress(locationDetails.fullText);
      setLoading(false);
      return;
    }

    // 2. Resolve via known landmarks & venues dictionary
    for (const item of KNOWN_VENUES) {
      if (item.regex.test(locationDetails.fullText)) {
        setCoords(item.coords);
        setResolvedAddress(locationDetails.fullText || item.label);
        setLoading(false);
        return;
      }
    }

    // 3. Otherwise geocode using OpenCage with fallback to OpenStreetMap Nominatim
    // CRITICAL CONSTRAINT: Do NOT use browser geolocation or attendee current position.
    const geocodeLocation = async () => {
      setLoading(true);

      const query = locationDetails.fullText;
      const rawApiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
      const openCageApi = typeof rawApiKey === "string" ? rawApiKey.trim() : "";

      // Try OpenCage first if key is present
      if (openCageApi) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000);

          const openCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            query
          )}&key=${openCageApi}`;

          const res = await fetch(openCageUrl, { signal: controller.signal });
          clearTimeout(timeoutId);

          if (res.ok) {
            const data = await res.json();
            if (data?.results && data.results.length > 0 && !isCancelled) {
              const { lat, lng } = data.results[0].geometry;
              setCoords({ lat, lng });
              setResolvedAddress(data.results[0].formatted || query);
              setLoading(false);
              return;
            }
          }
        } catch (err) {
          console.warn("OpenCage geocoding failed, trying Nominatim fallback:", err.message);
        }
      }

      // Fallback: OpenStreetMap Nominatim geocoding mechanism
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=1`;

        const res = await fetch(nominatimUrl, {
          signal: controller.signal,
          headers: {
            "Accept-Language": "en",
          },
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0 && !isCancelled) {
            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);
            if (!isNaN(lat) && !isNaN(lng)) {
              setCoords({ lat, lng });
              setResolvedAddress(data[0].display_name || query);
              setLoading(false);
              return;
            }
          }
        }
      } catch (err) {
        console.warn("Nominatim geocoding failed:", err.message);
      }

      if (!isCancelled) {
        setLoading(false);
      }
    };

    geocodeLocation();

    return () => {
      isCancelled = true;
    };
  }, [locationDetails, event]);

  const copyAddressToClipboard = () => {
    const textToCopy = locationDetails.fullText || resolvedAddress;
    if (!textToCopy || !locationDetails.isSpecified) return;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopied(true);
          toast.success("Venue address copied to clipboard!");
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          toast.info(textToCopy);
        });
    } else {
      toast.info(textToCopy);
    }
  };

  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationDetails.fullText || (coords ? `${coords.lat},${coords.lng}` : "")
  )}`;

  // Graceful fallback for Virtual / Online events
  if (locationDetails.isVirtual) {
    return (
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#8065E8]/5 via-[#F7F6F2] to-white border border-[#8065E8]/20 shadow-sm space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#8065E8]/10 text-[#8065E8] flex items-center justify-center shrink-0">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8065E8]">
              Virtual Event
            </span>
            <h3 className="text-lg font-bold text-[#111827]">
              Online Experience via Live Stream
            </h3>
            <p className="text-xs sm:text-sm text-[#737783] leading-relaxed">
              This experience will take place virtually. Attendee meeting links, access tokens,
              and calendar invites are issued to your registered account upon ticket confirmation.
            </p>
          </div>
        </div>

        {locationDetails.address && (
          <div className="p-3.5 bg-white rounded-2xl border border-[#E9E9E7] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate">
              <span className="font-semibold text-[#111827]">Access Info:</span>
              <span className="text-[#737783] truncate">{locationDetails.address}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Graceful fallback when Location is not specified or unresolvable
  if (!locationDetails.isSpecified || (!coords && !loading)) {
    return (
      <div className="rounded-3xl p-6 sm:p-8 bg-[#F7F6F2] border border-[#E9E9E7] text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-[#E9E9E7] shadow-sm flex items-center justify-center text-[#737783]">
          <MapPinIcon className="w-7 h-7 text-[#737783]" />
        </div>
        <div className="space-y-1 max-w-md mx-auto">
          <h3 className="text-base sm:text-lg font-bold text-[#111827]">
            Location not specified
          </h3>
          <p className="text-xs sm:text-sm text-[#737783] leading-relaxed">
            The organizer has not published physical coordinates or a specific venue address for
            this experience yet. Venue details will be announced prior to the event date.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E9E9E7] text-xs font-medium text-[#737783]">
          <span>Physical Venue TBA</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Venue Address Highlights Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F7F6F2] border border-[#E9E9E7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-white border border-[#E9E9E7] shadow-xs flex items-center justify-center text-[#8065E8] shrink-0 mt-0.5">
            <MapPinIcon className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-[#111827] truncate">
              {locationDetails.venue}
            </h4>
            <p className="text-xs text-[#737783] truncate mt-0.5">
              {locationDetails.address}
              {locationDetails.city ? ` • ${locationDetails.city}` : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={copyAddressToClipboard}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E9E9E7] hover:border-[#111827] text-xs font-semibold text-[#111827] shadow-xs transition-colors cursor-pointer"
          >
            <span>{copied ? "Copied!" : "Copy Address"}</span>
          </button>

          <a
            href={googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#111827] hover:bg-[#8065E8] text-white text-xs font-bold uppercase tracking-wider shadow-xs transition-colors no-underline cursor-pointer"
          >
            <span>Directions</span>
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      </div>

      {/* Interactive Leaflet Map Container */}
      <div className="relative h-[340px] sm:h-[400px] w-full rounded-3xl overflow-hidden border border-[#E9E9E7] shadow-md bg-[#111827]/5">
        {loading && !coords ? (
          <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 border-3 border-[#8065E8] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-medium text-[#737783]">
              Locating venue on map...
            </span>
          </div>
        ) : null}

        {coords && (
          <MapContainer
            center={[coords.lat, coords.lng]}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[coords.lat, coords.lng]}
              icon={createAuraspaceMarkerIcon()}
            >
              <Popup className="auraspace-map-popup">
                <div className="p-1 space-y-1 font-sans">
                  <p className="font-bold text-sm text-[#111827]">
                    {locationDetails.venue}
                  </p>
                  <p className="text-xs text-[#737783]">
                    {locationDetails.address}
                  </p>
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1 text-xs font-bold text-[#8065E8] hover:underline"
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>
              </Popup>
            </Marker>
            <MapResizer coords={coords} />
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default LocationMap;
export { LocationMap as LocationMaop };
