# WARNING

Avoid using useMemo on <Markers />, since they are rendered inside <Map />.
The react-native-maps library does not behave well with memoized values.
Even if everything works correctly in development, memoization values can lead to
crashes or unexpected behavior in production builds.

Markers often only re-render when their coordinate prop changes, ignoring
updates to other props. Because of this, forcing an update usually requires
toggling the marker’s visibility (e.g., {showMarker && <Marker_Component ... />} ),
which eliminates any benefit memoization would have provided.

Overall, this behavior is inconsistent and difficult to debug, so avoiding
memoization for map children is recommended.