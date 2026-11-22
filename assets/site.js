const root = document.documentElement;
const appearance = document.querySelector('#appearance');
const languageButtons = document.querySelectorAll('[data-lang]');

const translations = {
  en: {
    dark: 'Dark mode', light: 'Light mode', nav: 'Main navigation',
    language: 'Language', profiles: 'Contact and profiles',
  },
  vi: {
    skip: 'Chuyển đến nội dung', dark: 'Giao diện tối', light: 'Giao diện sáng',
    nav: 'Điều hướng chính', language: 'Ngôn ngữ', profiles: 'Liên hệ và hồ sơ',
    publications: 'Công bố khoa học', projects: 'Dự án', educationNav: 'Học vấn', education: 'Học vấn và giải thưởng',
    degree: 'Cử nhân Điện toán Nâng cao', university: 'Đại học Sydney',
    location: 'Sydney, Úc', cv: 'Tải CV (tiếng Anh)', email: 'Email', about: 'Giới thiệu',
    bio: 'Tôi đang hoàn thành chương trình Cử nhân Điện toán Nâng cao tại Đại học Sydney, chuyên ngành Khoa học Dữ liệu Tính toán. Tôi nghiên cứu hiệu năng của các mô hình thị giác–ngôn ngữ trong những điều kiện đánh giá khác nhau và ảnh hưởng của tín hiệu ngôn ngữ đến khả năng nhận dạng hình ảnh.',
    interest: 'Tôi quan tâm đến thị giác máy tính, học đa phương thức và đánh giá mô hình, đồng thời sẵn sàng tìm hiểu các hướng nghiên cứu liên quan.',
    dictaStatus: 'Đã được chấp nhận',
    dictaVenue: 'Hội nghị Quốc tế về Điện toán Hình ảnh Kỹ thuật số: Kỹ thuật và Ứng dụng (DICTA 2026)',
    dictaTitle: 'Đánh giá sự phù hợp giữa checkpoint và độ phân giải trong các mô hình thị giác–ngôn ngữ hai bộ mã hóa cố định: Độ chính xác và chi phí theo quy trình đo đã ghi nhận',
    code: 'Mã nguồn và kết quả',
    thesisStatus: 'Luận văn Honours',
    thesisTitle: 'Ngữ nghĩa ngôn ngữ có thực sự cải thiện phân đoạn ảnh khi thích nghi miền bán giám sát?',
    supervisors: 'Người hướng dẫn: TS Ravihansa Rajapakse và TS Ali Anaissi',
    premierTitle: 'Phân tích kết quả trận đấu Ngoại hạng Anh',
    premierBody: 'Dự án nhóm sử dụng dữ liệu ClubElo và mô hình rừng ngẫu nhiên để phân tích kết quả trận đấu.',
    echoTitle: 'EchoVol20 · Ứng dụng dự báo biến động',
    echoBody: 'Dự án tốt nghiệp theo nhóm về dự báo biến động. Tôi tham gia đánh giá mô hình và phát triển giao diện Streamlit.',
    dateDegree: 'Dự kiến hoàn thành vào tháng 12 năm 2026',
    major: 'Khoa học Dữ liệu Tính toán · Đại học Sydney',
    scholarship: 'Học bổng Quốc tế của Hiệu trưởng',
    contact: 'Liên hệ',
  },
  'zh-Hans': {
    skip: '跳至正文', dark: '深色模式', light: '浅色模式',
    nav: '主导航', language: '语言', profiles: '联系方式与个人主页',
    publications: '学术论文', projects: '项目', educationNav: '教育', education: '教育与奖项',
    degree: '高级计算学士', university: '悉尼大学',
    location: '澳大利亚悉尼', cv: '下载英文简历', email: '电子邮件', about: '个人简介',
    bio: '我正在悉尼大学攻读高级计算学士学位，主修计算数据科学。我的研究关注视觉语言模型在不同评估条件下的表现，以及语言引导对视觉识别的影响。',
    interest: '我的研究兴趣包括计算机视觉、多模态学习和模型评估，我也愿意探索相关方向。',
    dictaStatus: '已录用',
    dictaVenue: '国际数字图像计算技术与应用会议（DICTA 2026）',
    dictaTitle: '冻结双编码器视觉语言模型的检查点与分辨率匹配评估：准确率和记录协议下的成本',
    code: '代码与结果',
    thesisStatus: '荣誉学位论文',
    thesisTitle: '语言语义是否确实能提升半监督域自适应分割的表现？',
    supervisors: '导师：Ravihansa Rajapakse 博士和 Ali Anaissi 博士',
    premierTitle: '英超比赛结果分析',
    premierBody: '团队项目，使用 ClubElo 数据和随机森林分类模型研究比赛结果。',
    echoTitle: 'EchoVol20 波动率预测应用',
    echoBody: '关于波动率预测的团队毕业项目。我参与了模型评估和 Streamlit 界面开发。',
    dateDegree: '预计于 2026 年 12 月完成学业',
    major: '计算数据科学 · 悉尼大学',
    scholarship: '校长国际奖学金',
    contact: '联系我',
  },
};

const textElements = [...document.querySelectorAll('[data-copy]')];
const labelElements = [...document.querySelectorAll('[data-label]')];
const english = Object.fromEntries(textElements.map(element => [element.dataset.copy, element.textContent]));
let language = 'en';

function readPreference(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}

function savePreference(key, value) {
  try { localStorage.setItem(key, value); } catch {}
}

function setLanguage(next) {
  language = Object.hasOwn(translations, next) ? next : 'en';
  const copy = { ...english, ...translations[language] };
  root.lang = language;
  document.title = 'Trong Cuong Tran | ' + ({ en: 'Academic Portfolio', vi: 'Hồ sơ học thuật', 'zh-Hans': '学术主页' })[language];
  for (const element of textElements) element.textContent = copy[element.dataset.copy];
  for (const element of labelElements) element.setAttribute('aria-label', copy[element.dataset.label]);
  for (const button of languageButtons) button.setAttribute('aria-pressed', String(button.dataset.lang === language));
  updateThemeControl();
}

function updateThemeControl() {
  const dark = root.dataset.theme === 'dark';
  const { light, dark: darkLabel } = translations[language];
  const label = dark ? light : darkLabel;
  appearance.setAttribute('aria-label', label);
  appearance.setAttribute('aria-pressed', String(dark));
  appearance.querySelector('[data-copy="dark"]').textContent = label;
  document.querySelector('meta[name="theme-color"]').content = dark ? '#151b24' : '#ffffff';
}

for (const button of languageButtons) {
  button.addEventListener('click', () => {
    setLanguage(button.dataset.lang);
    savePreference('academic-language', language);
  });
}
appearance.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  savePreference('academic-theme', root.dataset.theme);
  updateThemeControl();
});
setLanguage(readPreference('academic-language'));
