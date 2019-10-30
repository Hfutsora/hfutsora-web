<template>
  <div class="et-circle-progress">
    <div
      :style="{height: width + 'px', width: width + 'px'}"
    >
      <svg viewBox="-6 -6 112 112">
        <filter
          :id="filterId"
          x="-40%"
          y="-40%"
          height="200%"
          width="200%"
        >
          <feOffset
            in="SourceGraphic"
            dx="0"
            dy="4"
            result="offOut"
          ></feOffset>
          <feColorMatrix
            in="offOut"
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.3 0"
            result="matrixOut"
          ></feColorMatrix>
          <feGaussianBlur
            in="matrixOut"
            stdDeviation="1.5"
            result="blurOut"
          ></feGaussianBlur>
          <feBlend
            in="SourceGraphic"
            in2="blurOut"
            mode="normal"
          ></feBlend>
        </filter>
        <!-- 定义环渐变 -->
        <defs>
          <linearGradient
            :id="pathId"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              style="stop-opacity:1"
              :style="`stop-color:${score >= 70 ? goldColor.start : score >= 65 ? greenColor.start : grayColor.start}`"
            ></stop>
            <stop
              offset="100%"
              style="stop-opacity:1"
              :style="`stop-color:${score >= 70 ? goldColor.end : score >= 65 ? greenColor.end : grayColor.end}`"
            ></stop>
          </linearGradient>
        </defs>
        <!-- 定义填充渐变 -->
        <defs>
          <linearGradient
            :id="fillId"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              style="stop-color:rgb(255,255,255);stop-opacity:1"
            ></stop>
            <stop
              offset="100%"
              style="stop-color:rgb(241,241,241);stop-opacity:1"
            ></stop>
          </linearGradient>
        </defs>
        <path
          :d="trackPath"
          stroke="#ececec"
          :stroke-width="relativeStrokeWidth"
          :fill="fillUrl"
        ></path>
        <path
          :d="trackPath"
          stroke-linecap="round"
          :stroke="pathUrl"
          :stroke-width="relativeFillStrokeWidth"
          fill="none"
          :style="circlePathStyle"
          :filter="filterUrl"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
import uuid from 'uuid';

export default {
  name: 'EtCircleProgress',
  props: {
    score: {
      type: Number || String,
      default: 0,
    },
    percentage: {
      type: Number,
      default: 0,
      required: true,
      validator: val => val >= 0 && val <= 100,
    },
    strokeWidth: {
      type: Number,
      default: 6,
    },
    fillStrokeWidth: {
      type: Number,
      default: 6,
    },
    width: {
      type: Number,
      default: 126,
    },
  },
  computed: {
    relativeStrokeWidth() {
      return ((this.strokeWidth / this.width) * 100).toFixed(1);
    },
    relativeFillStrokeWidth() {
      return ((this.fillStrokeWidth / this.width) * 100).toFixed(1);
    },
    trackPath() {
      const radius = parseInt(
        50 - parseFloat(this.relativeStrokeWidth) / 2,
        10,
      );
      return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius
        * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
    },
    perimeter() {
      const radius = 50 - parseFloat(this.relativeStrokeWidth) / 2;
      return 2 * Math.PI * radius;
    },
    circlePathStyle() {
      const { perimeter } = this;
      return {
        strokeDasharray: `${perimeter}px,${perimeter}px`,
        strokeDashoffset: `${(1 - this.percentage / 100) * perimeter}px`,
        transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease',
      };
    },
    filterUrl() {
      return `url(#${this.filterId})`;
    },
    pathUrl() {
      return `url(#${this.pathId})`;
    },
    fillUrl() {
      return `url(#${this.fillId})`;
    },
  },
  data() {
    return {
      goldColor: {
        start: '#ffd753',
        end: '#ecc14a',
      },
      grayColor: {
        start: '#c9c9c9',
        end: '#9b9b9b',
      },
      greenColor: {
        start: '#69ddb5',
        end: '#3bb09f',
      },
      filterId: `filter-${uuid()}`,
      fillId: `fill-${uuid()}`,
      pathId: `path-${uuid()}`,
    };
  },
};
</script>

<style scoped>
.aa {
  color: #9b9b9b;
}
</style>
