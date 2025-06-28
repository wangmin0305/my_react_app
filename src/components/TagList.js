import React from 'react';
import { Space, Tag } from 'antd';
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { removeTag } from "../store/reducers/tab"


const TagList = () => {
  const tagList = useSelector(state => state.tab.tagList); // 获取redux中的tagList
  const dispatch = useDispatch()
  const action = useLocation(); // 获取当前路由
  const navigate = useNavigate();

  // 关闭tag，默认往后一位设置
  const handleClose = (tag, index) => {
    dispatch(removeTag(index))
    // 关闭的不是当前页
    if (tag.path !== action.pathname) {
      return
    }
    // 关闭当前页
    if (index === tagList.length - 1) {
      const curData = tagList[index - 1]
      curData && navigate(curData.path)
    } else {
      if (tagList.length > 1) {
        const nextData = tagList[index + 1]
        nextData && navigate(nextData.path)
      }
    }
    // navigate(next.path)
  }
  return (
    <Space size={[0, 8]} wrap align="center" className='common-tag'>
      {tagList.map((tag, index) => (
        <Tag
          key={tag.path}
          closeIcon={tag.name !== "home"}
          color={tag.path === action.pathname ? "blue" : ""}
          onClose={() => handleClose(tag, index)}
          onClick={() => navigate(tag.path)}
        >
          {tag.label}
        </Tag>
      ))}
    </Space>
  );
};
export default TagList;