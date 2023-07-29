import { PromotionCard } from "../components/PromotionCard"

const Promotion = () => {
  return (
    <div  className="mx-auto md:px-6 bg-gradient-to-r from-red-900 to-purple-900 min-h-screen">
      <div className="container mx-auto px-5 lg:px-32 lg:pt-12">
        <div className="m-1 flex flex-wrap md:-m-2 py-20">
          <PromotionCard image={"https://mypromo.azureedge.net/promotions/mypromo.lk-promo-b61bff357007448f813dcabaadffa13e.jpg"}/>
          <PromotionCard image={"https://static.wixstatic.com/media/cb0848_a2904153d619430ab6257cb056c4e8fd~mv2.png/v1/fill/w_560,h_726,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/Thanksgiving%20Basket%20(8_5%20x%2011%20in)%20web.png"}/>
          <PromotionCard image={"https://marketplace.canva.com/EAFXz7QnsEQ/2/0/1131w/canva-red-illustrated-valentine%27s-day-movie-night-poster-4pAs72GhFgw.jpg"}/>
          <PromotionCard image={"https://www.gv.com.sg/media/imagesresize/promo_gvmclow6.jpg"}/>
          <PromotionCard image={"https://cdn.greatdeals.com.sg/wp-content/uploads/2018/03/19223550/golden-village-7-dollar-movie-ticket-promo-march-2018.jpg"}/>
          <PromotionCard image={"https://www.gv.com.sg/media/imagesresize/promo_gvmclow6.jpg"}/>
          <PromotionCard image={"https://img.freepik.com/premium-vector/cinema-movie-festival-poster-card-template-vector_269504-1983.jpg"}/>
          <PromotionCard image={"https://i.pinimg.com/736x/42/9f/27/429f27b161a92103c1b6f8adbdb17f2d--film-festival-poster-festival-logo.jpg"}/>
        </div>
      </div>
    </div>
  )
}

export default Promotion
