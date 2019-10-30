<template>
  <canvas id="particle-canvas"></canvas>
</template>

<script>
export default {
  name: 'DashboardView',
  data() {
    return {
      NUM_PARTICLES: 600,
      PARTICLE_SIZE: 1, // View heights
      SPEED: 20000, // Milliseconds

      particles: [],
    };
  },
  created() {
    this.$nextTick(() => {
      if (document.readystate !== 'loading') {
        this.startAnimation();
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          this.startAnimation();
        });
      }
    });
  },
  methods: {
    // modified version of random-normal
    normalPool(o) {
      let r = 0;
      do {
        const a = Math.round(this.normal({ mean: o.mean, dev: o.dev }));
        if (a < o.pool.length && a >= 0) { return o.pool[a]; }
        r += 1;
      } while (r < 100);

      return '';
    },
    randomNormal(o) {
      // eslint-disable-next-line no-param-reassign
      o = Object.assign({ mean: 0, dev: 1, pool: [] }, o);

      if (Array.isArray(o.pool) && o.pool.length > 0) {
        return this.normalPool(o);
      }

      let r;
      let a;
      let n;
      const l = o.mean;
      const t = o.dev;
      do {
        r = (a = 2 * Math.random() - 1) * a + (n = 2 * Math.random() - 1) * n;
      } while (r >= 1);

      const e = a * Math.sqrt(-2 * Math.log(r) / r);
      return t * e + l;
    },


    rand(low, high) {
      return Math.random() * (high - low) + low;
    },

    createParticle() {
      const colour = {
        r: 255,
        g: this.randomNormal({ mean: 125, dev: 20 }),
        b: 50,
        a: this.rand(0, 1),
      };
      return {
        x: -2,
        y: -2,
        diameter: Math.max(0,
          this.randomNormal({ mean: this.PARTICLE_SIZE, dev: this.PARTICLE_SIZE / 2 })),
        duration: this.randomNormal({ mean: this.SPEED, dev: this.SPEED * 0.1 }),
        amplitude: this.randomNormal({ mean: 16, dev: 2 }),
        offsetY: this.randomNormal({ mean: 0, dev: 10 }),
        arc: Math.PI * 2,
        startTime: performance.now() - this.rand(0, this.SPEED),
        colour: `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`,
      };
    },
    moveParticle(particle, canvas, time) {
      const progress = ((time - particle.startTime) % particle.duration) / particle.duration;
      return {
        ...particle,
        x: progress,
        y: ((Math.sin(progress * particle.arc) * particle.amplitude) + particle.offsetY),
      };
    },
    drawParticle(particle, canvas, ctx) {
      const cav = document.getElementById('particle-canvas');
      const vh = cav.height / 100;

      // eslint-disable-next-line no-param-reassign
      ctx.fillStyle = particle.colour;
      ctx.beginPath();
      ctx.ellipse(
        particle.x * canvas.width,
        particle.y * vh + (canvas.height / 2),
        particle.diameter * vh,
        particle.diameter * vh,
        0,
        0,
        2 * Math.PI,
      );
      ctx.fill();
    },

    draw(time, canvas, ctx) {
      // Move particles
      this.particles.forEach((particle, index) => {
        this.particles[index] = this.moveParticle(particle, canvas, time);
      });

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the particles
      this.particles.forEach((particle) => {
        this.drawParticle(particle, canvas, ctx);
      });

      // Schedule next frame
      requestAnimationFrame(frameTime => this.draw(frameTime, canvas, ctx));
    },

    initializeCanvas() {
      const canvas = document.getElementById('particle-canvas');
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      let ctx = canvas.getContext('2d');

      window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx = canvas.getContext('2d');
      });

      return [canvas, ctx];
    },

    startAnimation() {
      const [canvas, ctx] = this.initializeCanvas();

      // Create a bunch of particles
      for (let i = 0; i < this.NUM_PARTICLES; i += 1) {
        this.particles.push(this.createParticle(canvas));
      }

      requestAnimationFrame(time => this.draw(time, canvas, ctx));
    },
  },
};
</script>

<style lang="scss" scoped>
#particle-canvas {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, rgb(10, 10, 50) 0%,rgb(60, 10, 60) 100%);
  vertical-align: middle;
}
</style>
