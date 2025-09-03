import Banner from "./homePage/banner"
import { Footer } from "./homePage/footer"
import Navbar from "./homePage/navbar"
import Product from "./homePage/product"


export const LandingPage=()=>{
  return(
    <div>
     <Navbar/>
     <Banner/>
     <Product/>
     <Footer/>
    </div>
  )
}