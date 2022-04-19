import Nav from "../components/nav.jsx";
import Countdown from "../components/countdown.jsx";
import Main from "../components/main.jsx";
import StatusMap from "../components/status-map.jsx";
import FAQ from "../components/faq.jsx";
import SWRComponent from "../components/swr-component.jsx";
import { fetchTip } from "./api/tip.js";
import { fetchMinerVersions, fetchNodes } from "./api/data.js";

export default function Home({
  menu,
  tip,
  minerVersions,
  nodes,
  statusMap,
}) {
  return (
    <>
      <Nav menu={menu} />
      <section className="px-2">
        <SWRComponent
          component={Countdown}
          api="/api/tip"
          fallbackData={tip}
          refreshInterval={600000}
        />

        <SWRComponent
          component={Main}
          api="/api/data"
          fallbackData={{ minerVersions, nodes }}
          refreshInterval={5000}
        />

        <div className="max-w-screen-xl m-auto mb-20 grid grid-cols-2 gap-0 sm:gap-8 md:gap-16">
          <StatusMap statusMap={statusMap} />
          <FAQ />
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      menu: [
        {
          name: "Announcement",
          href: "https://www.nervos.org/blog/nervos-layer-1-a-major-protocol-upgrade-is-rolling-out",
        },
        {
          name: "Explorer",
          href: "https://explorer.nervos.org/",
        },
      ],

      // Ready, Not Ready, No Information
      statusMap: [
        {
          title: "Infrastructure Providers",
          header: "Exchange",
          data: [{ name: "Explorer", status: "Ready" }],
        },
      ],

      tip: await fetchTip(),
      minerVersions: await fetchMinerVersions(),
      nodes: await fetchNodes(),
    },
  };
}
