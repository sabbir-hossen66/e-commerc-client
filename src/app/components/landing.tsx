import Banner from "./homePage/banner"
import { Footer } from "./homePage/footer"
import Navbar from "./homePage/navbar"
import Product from "./homePage/product"
import ReviewsSection from "./homePage/review"


export const LandingPage=()=>{
  return(
    <div>
     <Navbar/>
     <Banner/>
     <Product/>
     <ReviewsSection/>
     <Footer/>
    </div>
  )
}