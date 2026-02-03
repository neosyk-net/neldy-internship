import React from "react";

const AuthorSkeleton = () => {
  return (
    <div className="d_profile de-flex">
      <div className="de-flex-col">
        <div className="profile_avatar">
          <div className="author-skel-wrap">
            <div className="author-skel author-skel-avatar" />
            <i className="fa fa-check"></i>
          </div>

          <div className="profile_name">
            <h4>
              <div className="author-skel author-skel-name" />
              <span className="profile_username">
                <div className="author-skel author-skel-username" />
              </span>

              <span id="wallet" className="profile_wallet">
                <div className="author-skel author-skel-wallet" />
              </span>


            </h4>
          </div>
        </div>
      </div>

      <div className="profile_follow de-flex">
        <div className="de-flex-col">
          <div className="profile_follower">
            <span className="author-skel author-skel-followers" />
          </div>

            <div className="author-skel author-skel-follow-btn">

            </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorSkeleton;
