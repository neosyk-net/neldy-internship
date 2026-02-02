import React from "react";

const NftCardSkeleton = () => {
  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <div className="ni-skel ni-skel-avatar" />
      </div>

      <div className="ni-skel ni-skel-countdown" />

      <div className="nft__item_wrap">
        <div className="ni-skel ni-skel-img" />
      </div>

      <div className="nft__item_info">
        <div className="ni-skel ni-skel-title" />
        <div className="ni-skel ni-skel-price" />

        <div className="ni-skel-like-row">
          <div className="ni-skel ni-skel-heart" />
          <div className="ni-skel ni-skel-likes" />
        </div>
      </div>
    </div>
  );
};

export default NftCardSkeleton;
