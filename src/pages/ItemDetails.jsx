import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { getItemDetailsById } from "../api/itemDetails";
import ItemDetailsSkeleton from "./ItemDetailsSkeleton";

const ItemDetails = () => {
  const { nftId } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    let ignore = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        setItem(null);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        const data = await getItemDetailsById(nftId);
        const raw = data?.item ?? data?.data ?? data;

        console.log(raw);

        const normalizedItem = {
          id: raw?.nftId ?? raw?.id,
          title: raw?.title,
          description: raw?.description,
          image: raw?.nftImage,
          price: raw?.price,
          views: raw?.views ?? 0,
          likes: raw?.likes ?? 0,
          owner: {
            id: raw?.ownerId,
            name: raw?.ownerName,
            image: raw?.ownerImage,
          },
          creator: {
            id: raw?.creatorId,
            name: raw?.creatorName,
            image: raw?.creatorImage,
          },
        };

        if (!ignore) setItem(normalizedItem);
      } catch (e) {
        if (!ignore) setError(e?.message || "Failed to load item details");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [nftId]);

  if (loading) {
    return <ItemDetailsSkeleton />;
  }

  if (error) {
    return <div style={{ padding: 24 }}>Error: {error}</div>;
  }
  if (!item) {
    return <div style={{ padding: 24 }}>Item not found.</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.image || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title || "NFT item"}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>
                  <p>{item.description || "No description provided."}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.owner?.id || ""}`}>
                            <img
                              className="lazy"
                              src={item.owner.image || AuthorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.owner?.id || ""}`}>
                            {item.owner.name || "Unknown"}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.creator?.id || ""}`}>
                            <img
                              className="lazy"
                              src={item.creator.image || AuthorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.creator?.id || ""}`}>
                            {item.creator.name || "Unknown"}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price ?? "—"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
