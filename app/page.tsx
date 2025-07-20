import dayjs from "dayjs";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getSites() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/sites`, { cache: "force-cache" });
    if (!res.ok) throw new Error("网络错误");
    return await res.json();
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const sites = await getSites();

  return (
    <div className="min-h-screen p-4 pb-16 sm:p-8 sm:pb-20 lg:p-20 font-[family-name:var(--font-geist-sans)] bg-background text-foreground">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">朋友动态</h1>
      <div className="relative mx-auto max-w-2xl">
        {/* 主时间轴竖线 - 移动端隐藏，桌面端显示 */}
        <div
          className="hidden sm:block absolute left-[100px] top-0 w-px h-full z-0"
          style={{ background: 'var(--timeline-line)' }}
        />
        <div className="flex flex-col gap-6 sm:gap-12 relative z-10">
          {sites.length === 0 && <div className="text-center text-gray-400">暂无数据</div>}
          {sites.map((site: any, idx: number) => {
            // 取最新文章的日期
            let latestDate = null;
            if (site.articles && site.articles.length > 0) {
              latestDate = site.articles[0].created_at;
            }
            // 判断是否为该日期的第一张卡片
            const prevSite = sites[idx - 1];
            let prevDate = null;
            if (prevSite && prevSite.articles && prevSite.articles.length > 0) {
              prevDate = prevSite.articles[0].created_at;
            }
            const showDateAndDot = latestDate !== prevDate;
            return (
              <div key={site.id} className="flex flex-col sm:flex-row items-start relative">
                {/* 移动端日期显示，仅文本，居中且在卡片正上方 */}
                {showDateAndDot && latestDate && (
                  <div className="sm:hidden w-full text-center mb-2">
                    <span className="text-sm text-gray-400">{dayjs(latestDate).format('YYYY-MM-DD')}</span>
                  </div>
                )}
                {/* 时间轴列：日期、竖线、圆点 - 仅桌面端显示 */}
                <div className="hidden sm:block relative w-[120px] flex flex-col items-center">
                  {/* 竖线 */}
                  <div
                    className="absolute left-[90px] top-0 w-px h-full z-0"
                    style={{ background: 'var(--timeline-line)' }}
                  />
                  {/* 日期和圆点容器 */}
                  {showDateAndDot && (
                    <div className="absolute top-[0px] left-5 right-3.5 flex justify-between z-10">
                      {/* 日期 */}
                      {latestDate && (
                        <span className="text-xs text-gray-400 whitespace-nowrap">{dayjs(latestDate).format('YYYY-MM-DD')}</span>
                      )}
                      {/* 圆点 */}
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                    </div>
                  )}
                </div>
                {/* 卡片内容列 */}
                <div className={`${showDateAndDot && latestDate ? 'sm:ml-4' : 'sm:ml-4'} w-full flex-1 bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)] p-4 sm:p-6 shadow`}>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-2">
                    <img src={site.logo} alt={site.name} width={32} height={32} className="sm:w-10 sm:h-10 rounded-full bg-white flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <a
                        href={site.url?.startsWith('http') ? site.url : `https://${site.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-base sm:text-lg text-blue-600 hover:underline cursor-pointer block truncate"
                      >
                        {site.name}
                      </a>
                      {site.last_fetched_at && (
                        <span className="block sm:inline sm:ml-2 text-xs text-gray-400 mt-1 sm:mt-0">最近同步：{dayjs(site.last_fetched_at).format('YYYY-MM-DD')}</span>
                      )}
                    </div>
                  </div>
                  <div
                    className="text-sm mb-3 sm:mb-2"
                    style={{ color: 'var(--desc-color)' }}
                  >
                    {site.description}
                  </div>
                  {site.articles && site.articles.length > 0 && (
                    <div>
                      <div className="font-semibold mb-2 sm:mb-1 text-sm">最新文章：</div>
                      <ul className="list-disc list-inside space-y-1.5 sm:space-y-1">
                        {site.articles.map((a: any, idx: number) => (
                          <li key={idx} className="text-sm">
                            <a href={a.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline cursor-pointer break-words">
                              {a.title}
                            </a>
                            <span className="inline ml-2 text-xs text-gray-400">{a.created_at ? `(${dayjs(a.created_at).format('YYYY-MM-DD')})` : null}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* 底部横线 */}
      <div className="relative mt-6 sm:mt-8">
        <div className="flex items-center max-w-lg mx-auto relative sm:translate-x-[60px]">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="px-4 sm:px-6 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">已经到底啦</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
}