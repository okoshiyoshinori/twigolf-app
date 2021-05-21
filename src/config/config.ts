interface envInfo  {
  api_url: string | undefined 
  pagePerNum: number | undefined 
}

const Config = ():envInfo | null => {
 if (process.env.NODE_ENV === "development") {
   return {
     api_url: process.env.REACT_APP_DEV_API_URL,
     pagePerNum: process.env.REACT_APP_PERNUM !== undefined ? Number(process.env.REACT_APP_PERNUM): undefined
   }
 }
 if (process.env.NODE_ENV === "production") {
   return {
     api_url: process.env.REACT_APP_PROD_API_URL,
     pagePerNum: process.env.REACT_APP_PERNUM !== undefined ? Number(process.env.REACT_APP_PERNUM): undefined
   }
 }
 if (process.env.NODE_ENV === "test") {
   return {
     api_url: process.env.REACT_APP_DEV_API_URL,
     pagePerNum: process.env.REACT_APP_PERNUM !== undefined ? Number(process.env.REACT_APP_PERNUM): undefined
   }
 }
 return null
}

export default Config()
