import ContentLoader from "react-content-loader"

const ProductsSkeleton = () => (
  <ContentLoader 
  speed={2}
  width="100%"
  height="100%"
  viewBox="0 0 380 300"
  backgroundColor="#f3f3f3"
  foregroundColor="#ecebeb"
>
  <rect x="0" y="8" rx="20" ry="20" width="435" height="150" /> 
  <rect x="0" y="180" rx="0" ry="0" width="150" height="30" /> 
  <rect x="0" y="240" rx="0" ry="0" width="300" height="50" />
</ContentLoader>
)

export default ProductsSkeleton

