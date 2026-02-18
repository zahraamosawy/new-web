import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";
import "./LanguageToggle.css";

/**
 * 语言切换组件
 * 用于在英语和阿拉伯语之间切换界面语言
 * 包含淡入淡出动画效果，并根据语言切换调整文档方向
 */
const LanguageToggle = () => {
  // 使用useTranslation钩子获取i18n实例
  const { i18n } = useTranslation();
  // 状态控制淡入淡出动画效果
  const [fade, setFade] = useState(false);

  // 切换语言的处理函数
  const toggleLang = () => {
    // 开始淡出动画
    setFade(true);
    // 设置300ms延时，确保淡出动画完成后再切换语言
    setTimeout(() => {
      // 根据当前语言确定新语言：英语切换为阿拉伯语，阿拉伯语切换为英语
      const newLang = i18n.language === "en" ? "ar" : "en";
      // 切换应用语言
      i18n.changeLanguage(newLang);
      // 更新HTML文档的语言属性
      document.documentElement.lang = newLang;
      // 根据语言设置文档方向：阿拉伯语为rtl（从右到左），英语为ltr（从左到右）
      document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
      // 重置动画状态，触发淡入效果
      setFade(false);
    }, 300);
  };

  // 渲染语言切换按钮
  return (
    <button 
      // 根据fade状态添加不同的动画类名
      className={`lang-btn-fixed ${fade ? "fade-out" : "fade-in"}`} 
      // 绑定点击事件处理函数
      onClick={toggleLang}
    >
      {/* 语言文本区域（当前为空，可根据需要添加） */}
      <span className="lang-text">
      </span>
      {/* 语言切换图标 */}
      <GrLanguage className="lang-icon" />
    </button>
  );
};

export default LanguageToggle;