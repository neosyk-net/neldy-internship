import React, { useEffect, useState } from "react";
import { getExploreItems } from "../../api/explore";
import NftCard from "../NftCard";
import NftCardSkeleton from "../NftCardSkeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState(""); 

  useEffect(() => {
    let ignore = false;

    async function fetchExplore() {
      try {
        setLoading(true);
        setError(null);

        await new Promise((r) => setTimeout(r, 1500));

       
        const data = await getExploreItems(filter);

        if (ignore) return;

        const results = data?.items ?? data?.results ?? data;
        const list = Array.isArray(results) ? results : [];

        const normalized = list.map((x) => ({
          id: x.id,
          title: x.title ?? x.name,
          price: x.price,
          likes: x.likes ?? 0,
          nftImage: x.nftImage ?? x.image ?? x.imageUrl,
          authorId: x.authorId ?? x.creatorId,
          authorImage: x.authorImage ?? x.creatorImage,
          expiryDate: x.expiryDate ?? x.endsAt ?? x.endTime,
        }));

        setItems(normalized);
        setVisibleCount(8); 
      } catch (err) {
        if (ignore) return;
        console.error("Explore API error:", err);
        setError(err?.message || "Explore failed");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchExplore();

    return () => {
      ignore = true;
    };
  }, [filter]); 

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)} 
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {error && <div style={{ padding: 12 }}>⚠️ {error}</div>}

      <div className="explore-grid">
        {loading
          ? new Array(8).fill(null).map((_, index) => (
              <div key={`skel-${index}`} className="explore-col">
                <NftCardSkeleton />
              </div>
            ))
          : items.slice(0, visibleCount).map((item) => (
              <div key={item.id} className="explore-col">
                <NftCard item={item} />
              </div>
            ))}
      </div>

      <div className="col-md-12 text-center">
        {!loading && visibleCount < items.length && (
          <button
            type="button"
            id="loadmore"
            className="btn-main lead"
            onClick={() =>
              setVisibleCount((c) => Math.min(c + 4, items.length))
            }
          >
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
