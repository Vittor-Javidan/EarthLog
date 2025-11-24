import { Controller } from "./Controller";
import { StaticDisplay } from "./StaticDisplay";
import { Marker_LastKnownLocation } from "./LastKnownLocation";
import { Markers_Project } from "./Project";
import { Markers_Sample } from "./Sample";

export const Markers = {
  Controller: Controller,
  StaticDisplay: StaticDisplay,
  LastKnownLocation: Marker_LastKnownLocation,
  Project: Markers_Project,
  Sample: Markers_Sample,
}