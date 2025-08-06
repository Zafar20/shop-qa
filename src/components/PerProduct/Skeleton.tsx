import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader 
  speed={2}
  width="100%"
  height="100%"
  viewBox="0 0 1300 600"
  backgroundColor="black"
  foregroundColor="#ecebeb"
>
    <rect x="0" y="0" rx="10" ry="10" width="1300" height="300" /> 
    <rect x="340" y="0" rx="10" ry="10" width="40" height="15" /> 
    <rect x="0" y="30" rx="0" ry="0" width="380" height="100" />
</ContentLoader>
)

export default Skeleton

