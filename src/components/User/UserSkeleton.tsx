import ContentLoader from "react-content-loader"

const UserSkeleton = () => (
    <ContentLoader 
    speed={2}
    width={350}
    height={400}
    viewBox="0 0 400 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    
  >
    <circle cx="49" cy="48" r="48" /> 
    <rect x="0" y="130" rx="0" ry="0" width="100" height="20" /> 
    <rect x="0" y="180" rx="0" ry="0" width="162" height="20" />
    <rect x="0" y="310" rx="0" ry="0" width="200" height="25" /> 
    <rect x="0" y="370" rx="0" ry="0" width="200" height="25" /> 
    <rect x="0" y="260" rx="0" ry="0" width="200" height="25" />
  </ContentLoader>
)

export default UserSkeleton

