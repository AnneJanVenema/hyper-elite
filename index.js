'use strict';

const username = require('username');
const foregroundColor = '#ffdeca';
const backgroundColor = '#120705';
const orange = '#ff7100';
let elite;
let message = true;

// Welcome message
// TODO: Change this to something more dynamic
let eliteMessage = 'Hello CMDR';
username().then(username => {
  eliteMessage = 'Welcome CMDR '+username;
});

// Get the date
// TODO: Update date after 00:00
const date = new Date(),
      locale = "en-us",
      eliteDate = date.getDate()+' '+date.toLocaleString(locale, { month: "short" })+' '+(date.getUTCFullYear() + 1286);

// Stole some time
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  Array.from(document.getElementsByClassName('elite_time')).forEach(
    function(element, index, array) {
        element.innerHTML = h + ":" + m + ":" + s;
    }
  );
  var t = setTimeout(startTime, 500);
}

// Add zero in front of single digit time (also part of the theft)
function checkTime(i) {
  if (i < 10) {i = "0" + i};
  return i;
}

// Do the things
exports.decorateTerm = (Term, { React, notify }) => {
  return class extends React.Component {

    constructor (props, context) {
      super(props, context);
      this._onTerminal = this._onTerminal.bind(this);
    }

    _onTerminal (term) {
      if(message){
        this.welcomessage();
      }
    }

    // Create elements and add them to hyper
    welcomessage() {
      var inserthere = document.getElementsByClassName('term_term')[0];
      elite = document.createElement('div');
      elite.id = 'elite_container';
      inserthere.id = 'has_message';
      elite.innerHTML = 
          '<div class="elite_container">\
            <div class="elite_message">'+eliteMessage+'</div>\
            <div class="elite_time_container">\
              <div class="elite_time"></div>\
              <div class="elite_date">'+eliteDate+'</div>\
            </div>\
          </div>';
      inserthere.insertBefore(elite,inserthere.firstChild);
      message = false; // So it only displays the first time
      startTime();
    }

    render () {
      return React.createElement(Term, Object.assign({}, this.props, {
        onTerminal: this._onTerminal
      }));
    }
  }
}

exports.decorateConfig = config => Object.assign({}, config, {
  // Default padding > we'll handle this in css
  padding: '0px',

  // Font
  fontSize: 12,

  // Cursor
  cursorColor: orange,
  cursorShape: 'UNDERLINE',

  // Colors, do you like orange? Because, yeah..
	backgroundColor,
	foregroundColor,
	borderColor: orange,
	cursorColor: orange,
	colors: {
		black: backgroundColor,
		red: orange,
		green: orange,
		yellow: orange,
		blue: orange,
		magenta: orange,
		cyan: orange,
		white: orange,
		lightBlack: orange,
		lightRed: orange,
		lightGreen: orange,
		lightYellow: orange,
		lightBlue: orange,
		lightMagenta: orange,
		lightCyan: orange,
		lightWhite: orange
	},
	css: `
		${config.css}

    /* TODO: make a new cursor that actually works * {
      cursor: url('data:image/x-icon;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa2hmmp2YkJp7cVyaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACXlZKaqqWVmsrGvpp2cV2aAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJuYlZq0r6Car6mcmtza1JqMhHKaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAm5iUmqeilpqgmpKaoJqQmsC9tpqBe26aAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACcmZWao56SmpWPiJqSjIaam5WNmqmlmpqWkoeadWtXmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJuZlJqgm4+akYqEmomDf5qOh4CanJWLmqCbjJq0samagXpimgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAm5iUmqKckJqTjYWaioN9moyGfZqTjoSanpmNmqihlZrW082aenJdmnFoTZoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACbmZWaop2QmpSNhZqMhH2ai4V7mpGKfZqWkIOanpeKmqOcj5rQzcaanJWFmm9oU5p0a1GadW9JmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJuZlZqjnpGalpCFmpCKfpqQiHuak4x8mpWPfpqak4OanpeJmqSekpqsppqa3NnVms/Kw5q5tqyajIZ1mnFpVpqEemOak4dpmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmpiUmqeilZqZlIqalY6CmpWNfZqWjn2al498mpmSgJqdlYWan5mJmqCajJqim4+ao52RmqKdkZqjnZCau7evmtXSzJq/u7SanZiMmn94ZpqGeWaaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACamJSapqCTmpmUiZqUjoKak4x7mpKKd5qNhXCajIRvmpGJc5qWj3yamZOBmpmRg5qXkYaalo6FmpaPh5qZk4yao52UmrOsoJq3saKam5WEmnVxapoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJqXlJqppJaan5mOmpqThZqZkYCalIx2mo2EbZqLgWqajYRtmpOLdJqZkn2ampOCmpiQg5qUjYKakoqDmpaPh5qhm5KarqicmqCYhZqBgHmaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmpiUmq2nmpqim5Can5eJmp2TgZqUi3OajYFpmoh9ZZqJfGWajoJpmpWLc5qZkX+amJCBmpiOgZqWjISam5OLmqmjl5qnn46aenhzmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACamJSaqKOVmp6ZjJqblYiamJGAmo+IcpqEfGmaf3hjmn93Y5qGfWmajodympWQf5qWjoGalZCEmpmTiZqim5CaoZuLmoSAeJoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJuYlJqppJeanpmNmpyViJqakoCakIhzmod/aZqEfGaahH1omoyEbpqWjnyamZOCmpuVh5qdmI6apZ6VmqKdjJp7eHGaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmpeUmrCpnJqknpKaoZmMmp6VhJqXjHeakoVtmo+CapqThm6amY54mqKYh5qjnY6ap6CTmq2lmZqso5Wagn9ymgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACal5SaqaSXmp+Zjpqak4SamJGAmpSLd5qQh3GakYlympWMeJqblYSanpmLmqKdkJqoopaaqKKTmnh1bZoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJqYlJqoopWanJaLmpiRhJqVjX2ak4t4mpGKdpqUjHmamJF/mp2Vh5qinZCaqKKWmqqlmJqBfG6aAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAm5mUmqijlZqdloual46DmpWNfZqWjXyamJB9mpuSgpqdlYaaopuOmqqjmJqtqJmafHdpmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACamJSap6GVmpmUipqTjYCakot8mpOLfJqWj3+ampKFmp6YjJqoopWasaydmn96a5oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJqXlJqjnZCalY6Fmo2FfZqLhHqaj4h8mpONgJqalIiaop2Qmq2onZp4cmaaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmpeUmqKbj5qSjYSaiIB7moiAepqOiH6al5CFmqKdkZqxrJ6agXhomgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACal5SaoJuOmo+IgpqFfnqah396mo+IgJqclYqasq6hmnx1ZZoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJuZlZqgm4+aj4mDmoeAfJqKhH+amJKKmraxp5qEfWqaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAm5iVmqKdkJqUjYaajYaCmpaPh5q6tayahHxpmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACamJSapJ+SmpiSi5qXkYmavbmxmomAbJoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJuYlJquqZuaqKKXmsfDu5qQh2+aAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmZeTmrSuoJrW0caakYdvmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACHhoKav7y1mnx0YJoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG9ra5p5dW6aAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////8f////D////wf///8D////AP///wB///8AH///AAP//wAAP/8AAAf/AAAH/wAAD/8AAB//AAA//wAAf/8AAP//AAH//wAD//8AB///AA///wAf//8AP///AH///wD///8B////A////wf///8P////H////z////8='), auto;
    }*/

    @keyframes loading_bg {
      0% {
        background-image: radial-gradient(50% 50%, #ffb000 0%, rgba(255,113,0,0.00) 100%);
        top: 50%:
        opacity: 1;
      }
      10% {
        opacity: 1;
      }
      11% {
        opacity: 0;
      }
      90% {
        opacity: 0;
      }
      91% {
        opacity: 1;
      }
      100% {
        background-image: radial-gradient(50% 50%, #FF0400 0%, rgba(255,113,0,0.00) 100%);
        top: -50%;
        opacity: 0.21;
      }
    }

    @keyframes loading_time_1 {
      0% { 
        opacity: 0;
        color: #f00;
      }
      10% {
        opacity: 1;
        margin: 1px 0 0 -1px;
      }
      40% {
        margin: 1px 0 0 -1px;
      }
      41% {
        margin: 0;
        color: #ffdeca;
      }
      100% { 
        opacity: 1;
        color: #ff7100;
      }
    }

    @keyframes loading_time_2 {
      0% { 
        opacity: 0;
        color: #f00;
      }
      10% {
        margin: 0 -1px 0 0;
        opacity: 1;
      }
      40% {
        color: #f00;
      }
      41% {
        color: #ffdeca;
      }
      100% {
        opacity: 1;
        color: #ff7100;
      }
    }

    @keyframes scanline {
      0% {
        height: 50px;
        transform: translateY(-60px);
      }
      10% {
        opacity: 0.14;
      }
      40% {
        height: 160px;
        opacity: 0;
      }
      100% {
        transform: translateY(100vh);
      }
    }

    @keyframes loading_message_text {
      0% {
        color: #ff0000;
        opacity: 0;
        top: 10px;
        left: -10px;
      }
      1% {
        opacity: 1;
      }
      80% {
        color: #ff0000;
        top: 10px;
        left: -10px;
      }
      81% {
        color: #ff7100;
        top: 6px;
        left: 4px;
      }
      99% {
        color: #ff7100;
        opacity: 1;
        top: 6px;
        left: 4px;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes loading_message_text_before {
      0% {
        height: 10px;
        background: #ffdeca;
        opacity: 0.8;
        top: 0;
      }
      20% {
        height: 10px;
        background: #ffdeca;
        opacity: 0.8;
        top: 0;
      }
      21% {
        height: 6px;
        background: #ffdeca;
        opacity: 0.5;
        top: 20px;
      }
      50 % {
        height: 6px;
        background: #ffdeca;
        opacity: 0.5;
        top: 20px;
      }
      51% {
        height: 19px;
        top: auto;
        opacity: 0.9;
        bottom: 0;
      }
      70% {
        height: 19px;
        top: auto;
        opacity: 0.9;
        bottom: 0;
      }
      71% {
        height: 10px;
        background: #ffdeca;
        opacity: 0.7;
        top: 0;
        bottom: auto;
      }
      90% {
        height: 10px;
        background: #ffdeca;
        opacity: 0.7;
        top: 0;
      }
      91% {
        height: 20px;
        background: #ffdeca;
        opacity: 1;
        top: 0;
      }
    }

    @keyframes loading_line_1 {
      0% {
        width: 50%;
        background: #ff0000;
        opacity: 0;
        right: 30px;
        bottom: -7px;
      }
      19% {
        width: 50%;
        right: 30px;
        bottom: -7px;
      }
      20% {
        width: 80%;
        opacity: 1;
        right: 0;
        bottom: 0;
      }
      64% {
        width: 80%;
        right: 0;
        bottom: 0;
      }
      65% {
        width: 65%;
        right: 100px;
        bottom: -7px;
      }
      98% {
        color: #ff7100;
        width: 80%;
      }
      99% {
        background: #ffdeca;
        opacity: 1;
        right: 0;
        bottom: 0;
      }
    }

    @keyframes loading_time_before {
      0% {
        background: #f00;
        top: -2px;
        left: -4px;
        opacity: .3;
      }
      19% {
        background: #f00;
        top: -2px;
        left: -4px;
        opacity: .3;
      }
      20% {
        background: #f00;
        top: 4px;
        left: 2px;
        opacity: .6;
      }
      40% {
        height 14px;
        background: #f00;
        top: 4px;
        left: 2px;
        opacity: .6;
      }
      99% {
        height: 36px;
        background: #ffdeca;
        top: 0px;
        left: 0px;
        opacity: 1;
      }
      100% {
        width: 1px;
        height: 36px;
        background: #9d512f;
        opacity: 1;
        top: 0;
        left: 0;
      }
    }

    @keyframes loading_time_after {
      0% {
        height: 4px;
        opacity: 1;
      }
      40% {
        height: 4px;
        top: 0;
      }
      41% {
        height: 16px;
        top: 26px;
        opacity: 0.6;
      }
      60% {
        height: 16px;
        top: 26px;
        opacity: 0.6;
      }
      61% {
        height: 7px;
        top: 36px;
        opacity: 0.8;
      }
      80% {
        height: 7px;
        top: 36px;
        opacity: 0.8;
      }
      81% {
        height: 10px;
        top: 0;
        opacity: 0.4;
      }
      99% {
        height: 3px;
        top: 0;
        opacity: 0.4;
      }
      100% {
        opacity: 0;
      }
    }

    #elite_container {
      width: calc( 100% - 24px );
      height: 60px;
      position: absolute;
      left: 24px;
      top: 0;
    }

    #elite_container::after {
      content: '';
      width: 100%;
      height: 1px;
      background: #ff7100;
      position: absolute;
      right: 0;
      bottom: 0;
      animation: loading_line_1 500ms forwards;
    }

    .elite_message {
      width: 100%;
      padding: 20px 0;
      line-height: 21px;
      font-family: "EuroCaps";
      font-weight: normal;
      font-size: 21px;
      color: #FFF9EF;
      position: absolute;
      top: 0;
      left: 0;
      float: left;
      opacity: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-text-size-adjust: 100%;
      animation: loading_message_text 500ms forwards;
      animation-delay: 300ms;
    }

    .elite_message::before {
      content: '';
      width: 100%;
      height: 0px;
      position: absolute;
      left: 0;
      top: 0;
      animation: loading_message_text_before 600ms forwards;
    }

    .elite_time_container {
      height: 36px;
      padding: 0 20px 0 10px;
      position: absolute;
      top: 13px;
      right: 0;
      animation: loading_time 600ms forwards;
      animation-delay: 200ms;
    }

    .elite_time_container::before {
      content: '';
      width: 1px;
      height: 36px;
      background: #9d512f;
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      animation: loading_time_before 400ms forwards;
      animation-delay: 400ms;
    }

    .elite_time_container::after {
      content: '';
      width: 100%;
      height: 4px;
      background: #ffdeca;
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      animation: loading_time_after 400ms forwards;
      animation-delay: 400ms;
    }

    .elite_time {
      padding: 2px 0 0;
      opacity: 0;
      line-height: 16px;
      text-transform: uppercase;
      text-shadow: 0 0 4px rgba(255, 103, 0, 0.76);
      font-family: "Telegrama-Render";
      font-weight: normal;
      font-size: 16px;
      color: #ff7100;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-text-size-adjust: 100%;
      animation: loading_time_1 500ms forwards;
      animation-delay: 500ms;
    }

    .elite_date {
      padding: 5px 0 0;
      opacity: 0;
      letter-spacing: -0.2px;
      line-height: 12px;
      text-shadow: 0 0 4px rgba(255, 103, 0, 0.76);
      font-family: "Telegrama-Render";
      font-weight: normal;
      font-size: 12px;
      color: #ff7100;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-text-size-adjust: 100%;
      animation: loading_time_2 500ms forwards;
      animation-delay: 500ms;
    }

    .terms_termGroup::before {
      content: '';
      width: 100%;
      height: 50px;
      background-image: radial-gradient(50% 49%, #FF7100 50%, rgba(255,113,0,0.00) 100%);
      background-blend-mode: overlay;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      animation-delay: 2s;
      animation-name: scanline;
      animation-duration: 10s;
      animation-timing-function: ease-in;
      animation-iteration-count: infinite;
    }

    .term_term iframe {
      padding: 20px 20px 20px 24px;
    }

    .term_term#has_message iframe {
      padding: 80px 20px 20px 24px;
    }

    .hyper_main {
      border: none;
    }

    .header_header {
      top: 0;
      left: 0;
      right: 0;
    }

    .tabs_nav {
      height: 38px;
    }

		.tabs_title {
      height: inherit;
      padding: 0 76px;
      background: none;
      box-sizing: box-sizing;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-transform: uppercase;
      text-shadow: 0 0 2px rgba(255, 103, 0, 0.3);
      line-height: 40px;
      font-family: "EuroCaps";
      font-weight: bold;
      font-size: 15px;
      color: #ff7100;
      opacity: 1;
		}

    ul.tabs_list {
      height: 38px;
      padding: 5px 0 5px 5px;
      box-sizing: border-box;
    }

    li.tab_tab {
      height: 28px;
      padding: 0;
      border: none;
      box-sizing: border-box;
    }

    li.tab_active {
      border: none;
    }

    li.tab_tab .tab_textInner {
      height: 28px;
      padding: 0 30px;
      background: none;
      box-sizing: border-box;
      text-transform: uppercase;
      text-shadow: 0 0 2px rgba(255, 103, 0, 0.3);
      line-height: 30px;
      font-family: "EuroCaps";
      font-weight: bold;
      font-size: 15px;
      color: #ff7100;
      opacity: 0.7;
      left: 0;
      right: 0;
      transition: background 300ms ease-out;
    }

    li.tab_tab:hover .tab_textInner {
      opacity: 1;
      text-shadow: 0 0 2px rgba(255, 103, 0, 0.3);
    }

    li.tab_active .tab_textInner {
      background: #ff7100;
      color: #120705;
      opacity: 1;
    }

    .tab_tab::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      background: #fff;
      transform: scaleX(0);
      transform-origin: center left;
    }

    .tab_tab.tab_active::before {
      transform: scaleX(1);
      transition: all 200ms cubic-bezier(0.0, 0.0, 0.2, 1);
    }

		.tab_active:before {
			border-color: rgba(255, 106, 193, 0.25);
		}

    .tab_icon {
      width: 28px;
      height: 28px;
      top: 0;
      right: 0;
      border-radius: 0;
      transform: scale(1);
    }

    .tab_icon svg {
      width: 10px;
      height: 10px;
      fill: #ff7100;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }

    .tab_tab.tab_active .tab_icon svg {
      fill: #120705;
    }

    .tabs_borderShim {
      display: none;
    }

		.terminal,
		.term_fit:not(.term_term) {
			opacity: 0.6;
		}

    .terms_terms {
      margin-top: 38px;
      overflow: hidden;
    }

		.terminal.focus,
		.term_fit.term_active {
			opacity: 1;
      overflow: hidden;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAECAYAAAE432WsAAAABGdBTUEAALGPC/xhBQAAABFJREFUCB1j+J/DIMUABnAWACksAwvS+Hv6AAAAAElFTkSuQmCC) repeat;
      background-size: auto 2px;
			transition: opacity 0.12s ease-in-out;
			will-change: opacity;
      position: relative;
    }

    .term_fit.term_active::before {
      content: '';
      width: 100%;
      height: 2px;
      background-image: linear-gradient(-270deg, #DB7200 0%, #F58824 51%, #DB7200 100%);
      box-shadow: 0 1px 2px 0 rgba(255,113,0,0.40), 0 2px 4px 0 rgba(247,119,2,0.30);
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
    }

    .term_fit.term_active::after {
      content: '';
      width: 100%;
      height: 100%;
      background-image: radial-gradient(50% 50%, #FF0400 0%, rgba(255,113,0,0.00) 100%);
      opacity: 0.21;
      position: absolute;
      top: -50%;
      left: 0;
      pointer-events: none;
      animation: loading_bg 400ms forwards;
    }

    /* TODO: scrollbar that actually looks like the one ingame

    ::-webkit-scrollbar {
    }
    ::-webkit-scrollbar-thumb {
    }

    */
	`
});