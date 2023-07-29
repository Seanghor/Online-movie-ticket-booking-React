import React from "react";


interface PromotionCardProps {
    image: string
}


export const PromotionCard: React.FunctionComponent<PromotionCardProps> = (props: PromotionCardProps) => {
    const { image} = props;
    return (
        <div className="flex w-1/4 flex-wrap">
            <div className="w-full p-1 md:p-2">
              <img
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center"
                src={image}/>
            </div>
          </div>
    );
}

