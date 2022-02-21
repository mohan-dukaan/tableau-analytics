import React, { PureComponent } from "react";
import url from "url";
const { tableau } = window;

// const token = "UIXMKmpsTN+eecPBgaHwYQ==:r1XxAbrhlobueA6jLfOaEf9lJskuAmRc";
const token = null
function tokenizeUrl(_url) {
  const parsed = url.parse(_url, true);
  const { protocol, host, pathname } = parsed;
  if (!!token) {
    return `${protocol}//${host}/trusted/${token}${pathname}`;
  }
  return protocol + "//" + host + pathname;
}

export default class Tableau extends PureComponent {
  componentDidMount() {
    const { url } = this.props;
    this.initTableau(url);
  }

  componentWillReceiveProps(nextProps) {
    const isReportChanged = nextProps.url !== this.props.url;
    // Only report is changed - re-initialize
    if (isReportChanged) {
      this.initTableau(nextProps.url);
    }
  }

  initTableau = (url) => {
    // cleanup
    if (this.viz) {
      this.viz.dispose();
      this.viz = null;
    }
    this.viz = new tableau.Viz(this.container, tokenizeUrl(url));
    // viz = new tableau.Viz(ref.current, tokenizeUrl(url));
  };

  render() {
    return (
      <div
        ref={(c) => (this.container = c)}
        style={{
          width: "80vw",
          height: "93vh",
          overflowY: "scroll",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          borderRadius: 4,
        }}
      />
    );
  }
}
