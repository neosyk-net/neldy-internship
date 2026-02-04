const ItemDetailsSkeleton = () => {
  return (
    <div id="wrapper" className="item-details-skel">
      <div className="no-bottom no-top" id="content">
        <section className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {/* LEFT */}
              <div className="col-md-6 text-center">
                <div className="hc-skel ids-img mb-sm-30" />
              </div>

              {/* RIGHT */}
              <div className="col-md-6">
                <div className="item_info">
                  <div className="hc-skel ids-title" />

                  <div className="item_info_counts">
                    <span className="hc-skel ids-pill" />
                    <span className="hc-skel ids-pill" />
                  </div>

                  <div className="hc-skel ids-line" />
                  <div className="hc-skel ids-line" />
                  <div className="hc-skel ids-line short" />

                  {/* Owner */}
                  <div className="hc-skel ids-label" />
                  <div className="ids-author">
                    <div className="hc-skel ids-avatar" />
                    <div className="hc-skel ids-name" />
                  </div>

                  {/* Creator */}
                  <div className="hc-skel ids-label" />
                  <div className="ids-author">
                    <div className="hc-skel ids-avatar" />
                    <div className="hc-skel ids-name" />
                  </div>

                  {/* Price */}
                  <div className="hc-skel ids-label" />
                  <div className="hc-skel ids-price" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetailsSkeleton;
