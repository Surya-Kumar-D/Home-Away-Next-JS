"use client";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
const iconUrl =
  "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const markerIcon = icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
});

import { findCountryByCode } from "@/utils/countries";
import CountryFlagAndName from "../card/CountryFlagAndName";
import Title from "./Title";

function PropertyMap({ countryCode }: { countryCode: string }) {
  const defaultLocation = [51.505, -0.09] as [number, number];
  const location = findCountryByCode(countryCode)?.location as [number, number];

  return (
    <div className="mt-4">
      <div className="mb-4">
        <Title text="Where will you be staying" />
        <CountryFlagAndName countryCode={countryCode} />
      </div>
      <MapContainer
        scrollWheelZoom={false}
        zoomControl={false}
        center={location || defaultLocation}
        className="relative h-[50vh] z-0 rounded-lg"
        zoom={7}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <Marker
          position={location || defaultLocation}
          icon={markerIcon}
        ></Marker>
      </MapContainer>
    </div>
  );
}

export default PropertyMap;
