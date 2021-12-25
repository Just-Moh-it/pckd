import React, { useState, useEffect } from "react";
import { ReactComponent as SortAscending } from "../../../assets/icons/sort-ascending.svg";
import { ReactComponent as Filter } from "../../../assets/icons/filter.svg";
import styled from "styled-components";
import ListItem from "../../../components/ListItem";
import {
  getCompanyLogoLinkFromURI,
  getHumanDateFromEpoch,
} from "../../../utils";

// Icons and assets
import { ReactComponent as Globe } from "../../../assets/icons/globe.svg";
import { ReactComponent as Click } from "../../../assets/icons/click.svg";
import { ReactComponent as Link } from "../../../assets/icons/link.svg";
import { ReactComponent as Calendar } from "../../../assets/icons/calendar.svg";
import { useDispatch, useSelector } from "react-redux";
import { getUserPckds, selectPckd } from "../../../features/dashboardSlice";

const LeftWrapperStyles = styled.div`
  height: 100%;
  padding: 14px 30px 0 0;

  & .main-btn {
    padding: 7px;
  }

  /* Header Content */
  & .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 18px 0 33px;
  }

  /* Search Bar */
  & .search-bar {
    padding: 13px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & .main-btn svg {
    width: 24px;
    margin-bottom: -6px;
  }

  & .search-bar input {
    flex-grow: 1;
    border: none;
    background-color: transparent;
    padding: 0;
    font-size: 16px;
    line-height: 18px;
    color: #878787;
    outline: none;
    margin-left: 10px;
  }
  & .search-bar svg {
    height: 18px;
  }

  & {
    overflow: auto;
  }
`;

const data = [
  {
    leftIcon: {
      hover: "Google.com",
      src: "https://google.com/favicon.ico",
    },
    rightItem: {
      subtitleItems: [
        {
          icon: { src: <Calendar />, hover: "Created on" },
          text: "13 Sep, 2004",
        },
      ],
      id: 1,
      title: "Gmail Link for share",
      target: "google.com",
      onClick: () => {
        console.log("I was clicked!");
      },
      bylineItems: [
        {
          icon: {
            src: <Globe />,
            hover: "Link",
          },
          text: "https://gmail.com",
        },
        {
          icon: {
            src: <Link />,
            hover: "Pckd",
          },
          text: "/gmail",
        },
        {
          icon: {
            src: <Click />,
            hover: "Clicks",
          },
          text: "31",
        },
      ],
      moreButtonItems: [
        {
          text: "Edit",
          onClick: () => {
            "Edit Was Clicked";
          },
        },
      ],
    },
  },
];

const dummyData = data;

const LeftWrapper = () => {
  const dispatch = useDispatch();
  const { userPckds: rawUserPckds, activePckd } = useSelector(
    (state) => state.dashboard
  );
  const [userPckds, setUserPckds] = useState(dummyData);

  useEffect(() => {
    dispatch(getUserPckds());

    if (rawUserPckds.length !== 0) {
      dispatch(selectPckd(rawUserPckds[0]?.id));
    }
  }, [dispatch, rawUserPckds]);

  useEffect(() => {
    const formatForLeftBar = (pckds) => {
      if (pckds.length === 0) {
        return;
      }

      return pckds.map((pckd) => ({
        leftIcon: {
          hover: pckd.target,
          src: getCompanyLogoLinkFromURI(pckd?.target),
        },
        rightItem: {
          subtitleItems: [
            {
              icon: { src: <Calendar />, hover: "Created on" },
              text: getHumanDateFromEpoch(pckd.createdAt),
            },
          ],
          id: pckd.id,
          title: pckd.title || "Untitled",
          target: pckd.target,
          bylineItems: [
            {
              icon: {
                src: <Globe />,
                hover: "Link",
              },
              text: pckd.target,
            },
            {
              icon: {
                src: <Link />,
                hover: "Pckd",
              },
              text: pckd.pckd,
            },
            {
              icon: {
                src: <Click />,
                hover: "Clicks",
              },
              text: pckd.hitCount,
            },
          ],
          moreButtonItems: [
            {
              text: "Edit",
              onClick: () => {
                "Edit Was Clicked";
              },
            },
          ],
        },
      }));
    };
    setUserPckds(formatForLeftBar(rawUserPckds));
  }, [dispatch, rawUserPckds]);

  const select = (id) => {
    dispatch(selectPckd(id));
  };

  console.log(dummyData);
  return (
    <LeftWrapperStyles className="title-wrapper">
      {/* Title */}
      <div className="header-content">
        <div className="title">
          <h1 className="heading">Links</h1>
          <h3 className="sub-heading">View past links</h3>
        </div>
        <div>
          <button className="shadowed btn main-btn">
            {/* Icon */}
            <SortAscending />
          </button>
        </div>
      </div>
      {/* Header-content */}
      <div className="header-content">
        <div className="search-bar shadowed">
          <Filter />
          <input type="text" placeholder="Filter..." />
        </div>
      </div>
      <div className="main-content">
        <div className="list">
          {userPckds?.map((item) => (
            <ListItem
              onClick={() => select(item.rightItem.id)}
              leftIcon={item.leftIcon}
              rightItem={item.rightItem}
              isActive={activePckd?.id === item?.rightItem?.id}
              className="active"
            />
          ))}
        </div>
      </div>
    </LeftWrapperStyles>
  );
};

export default LeftWrapper;