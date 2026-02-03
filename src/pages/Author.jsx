import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AuthorImageFallback from "../images/author_thumbnail.jpg";
import { getAuthorById } from "../api/author";
import AuthorSkeleton from "../components/author/AuthorSkeleton";

const Author = () => {
  const { authorId } = useParams();

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    async function fetchAuthor() {
      try {
        setLoading(true);
        setError(null);
        await new Promise((r) => setTimeout(r, 1500));

        const data = await getAuthorById(authorId);
        console.log("AUTHOR PAGE API:", data);

        setAuthor(data);
        setFollowers(data?.followers ?? data?.followerCount ?? 0);
      } catch (err) {
        setError(err?.message || "Failed to load author");
      } finally {
        setLoading(false);
      }
    }

    if (authorId) fetchAuthor();
  }, [authorId]);

  const bannerUrl = author?.bannerImage || AuthorBanner;
  const avatarUrl = author?.authorImage || AuthorImageFallback;

  function toggleFollow() {
    setFollowers((f) => Math.max(0, isFollowing ? f - 1 : f + 1));
    setIsFollowing((prev) => !prev);
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          style={{ background: `url(${bannerUrl}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {error && <div style={{ padding: 12 }}>⚠️ {error}</div>}

                {loading ? (
                  <AuthorSkeleton />
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={avatarUrl} alt="" />
                        <i className="fa fa-check"></i>

                        <div className="profile_name">
                          <h4>
                            {author?.authorName || "Unknown"}
                            <span className="profile_username">
                              {author?.tag ? `@${author.tag}` : ""}
                            </span>

                            <span id="wallet" className="profile_wallet">
                              {author?.address || ""}
                            </span>

                            {!loading && (
                              <button
                                id="btn_copy"
                                title="Copy Text"
                                onClick={() => {
                                  const text = author?.address || "";
                                  if (text) navigator.clipboard.writeText(text);
                                }}
                              >
                                Copy
                              </button>
                            )}
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {followers} followers
                        </div>

                        <button
                          type="button"
                          className="btn-main"
                          onClick={toggleFollow}
                          disabled={loading}
                        >
                          {isFollowing ? "Following" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Items */}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    loading={loading}
                    items={author?.nftCollection || []}
                    authorId={authorId}
                    author={author}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
