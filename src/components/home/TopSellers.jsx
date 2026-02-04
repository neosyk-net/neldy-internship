import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { getTopSellers } from "../../api/topSellers";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTopSellers();
        await new Promise((r) => setTimeout(r, 1500));

        setSellers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fadeUp">Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {(loading ? new Array(12).fill(null) : sellers).map(
                (seller, index) => (
                  <li
                    key={seller?.id ?? `skel-${index}`}
                    data-aos="fade-right"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                  >
                    {seller ? (
                      <>
                        <div className="author_list_pp">
                          <Link to={`/author/${seller.authorId}`}>
                            <img
                              className="lazy pp-author"
                              src={seller.authorImage || AuthorImage}
                              alt={seller.authorName || "Author"}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>

                        <div className="author_list_info">
                          <Link to={`/author/${seller.authorId}`}>
                            {seller.authorName}
                          </Link>
                          <span>{seller.price} ETH</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="author_list_pp">
                          <div className="ts-skel ts-skel-avatar" />
                        </div>

                        <div className="author_list_info">
                          <div className="ts-skel ts-skel-name" />
                          <div className="ts-skel ts-skel-sales" />
                        </div>
                      </>
                    )}
                  </li>
                ),
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
