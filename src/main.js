import Vue from 'vue';
import { Time } from './time';
import _ from 'lodash';

require('style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css');
require('bootstrap');

new Vue({
  el: '#app',
  data: {
    order: {
      keys: ['pontos', 'gm', 'gs'],
      sort: ['desc', 'desc', 'asc'],
    },
    filter: '',
    colunas: ['nome', 'pontos', 'gm', 'gs', 'saldo'],
    times: [
      new Time("Palmeiras", require('./assets/palmeiras.png')),
      new Time("America MG", require('./assets/ammg.gif')),
      new Time("Atlético MG", require('./assets/atletico.png')),
      new Time("Atlético PR", require('./assets/atlpr.png')),
      new Time("Bahia", require('./assets/bahia.png')),
      new Time("Botafogo", require('./assets/botafogo.gif')),
      new Time("Céara", require('./assets/ceara.png')),
      new Time("Chapecoense", require('./assets/chapeco.png')),
      new Time("Corinthians", require('./assets/corinthians.png')),
      new Time("Cruzeiro", require('./assets/cruzeiro.png')),
      new Time("Flamengo", require('./assets/fla.png')),
      new Time("Fluminense", require('./assets/fluminense.png')),
      new Time("Gremio", require('./assets/gremio.png')),
      new Time("Internacional", require('./assets/interrs.png')),
      new Time("Paraná", require('./assets/parana.png')),
      new Time("Santos", require('./assets/santos.png')),
      new Time("São Paulo", require('./assets/saopaulo.png')),
      new Time("Sport", require('./assets/sport.gif')),
      new Time("Vasco", require('./assets/vasco.png')),
      new Time("Vitória", require('./assets/vitoria.png')),
    ],
    novoJogo: {
      casa: {
        time: null,
        gols: 0
      },
      fora: {
        time: null,
        gols: 0
      }
    },
    view: 'tabela',
  },
  methods: {
    fimJogo(){
      let timeAdversario = this.novoJogo.fora.time;
      let gols = +this.novoJogo.casa.gols;
      let golsAdversario = +this.novoJogo.fora.gols;
      this.novoJogo.casa.time.fimJogo(timeAdversario, gols, golsAdversario);
      this.showView('tabela');
    },
    createNovoJogo(){
      let indexCasa = Math.floor(Math.random() * 20),
          indexFora = Math.floor(Math.random() * 20);

      this.novoJogo.casa.time = this.times[indexCasa];
      this.novoJogo.casa.gols = 0;
      this.novoJogo.fora.time = this.times[indexFora];
      this.novoJogo.fora.gols = 0;
      this.showView('novojogo');
    },
    showView(view){
      this.view = view;
    },
    sortBy(coluna){
      this.order.keys = coluna;
      this.order.sort = this.order.sort == 'desc' ? 'asc' : 'desc';
    }
  },
  computed: {
    timesFiltered(){
      let colecao = _.orderBy(this.times, this.order.keys, this.order.sort);

      return _.filter(colecao, item => {
        return item.nome.indexOf(this.filter) >= 0;
      });
    }
  },
  filters: {
    saldo(time){
      return time.gm - time.gs;
    },
    ucwords(value){
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
});
