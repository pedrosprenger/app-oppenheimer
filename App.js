import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// ---------------------------------------------------------------
// DADOS (tema: filme Oppenheimer) - troque as URLs por fotos reais se quiser
// ---------------------------------------------------------------
const filme = {
  titulo: 'Oppenheimer',
  imagem: 'https://picsum.photos/seed/oppenheimer-filme/800/400',
  descricao:
    'Durante a Segunda Guerra Mundial, o físico J. Robert Oppenheimer lidera o Projeto Manhattan, esforço secreto dos Estados Unidos para criar a primeira bomba atômica. O filme acompanha o brilhantismo científico, os dilemas morais e as consequências políticas que marcaram a vida do cientista.',
  orcamento: 100000000,
  voto: 8.1,
  duracao: 181,
  lancamento: '2023-07-19',
};

const atores = [
  {
    id: '1',
    personagem: 'J. Robert Oppenheimer',
    nome: 'Cillian Murphy',
    foto: 'https://picsum.photos/seed/cillian/400/400',
    nascimento: '1976-05-25',
    sexo: 'Masculino',
    local: 'Douglas, Cork, Irlanda',
    descricao:
      'Cillian Murphy é um ator irlandês nascido em 1976, em Douglas, na cidade de Cork. Ficou muito conhecido por interpretar Thomas Shelby na série Peaky Blinders e pelo Espantalho na trilogia Batman de Christopher Nolan. Em 2024, venceu o Oscar de melhor ator por sua atuação em Oppenheimer.',
    filmes: [
      { titulo: 'Batman Begins', data: '2005-06-15' },
      { titulo: 'Dunkirk', data: '2017-07-21' },
      { titulo: 'Oppenheimer', data: '2023-07-19' },
    ],
  },
  {
    id: '2',
    personagem: 'Kitty Oppenheimer',
    nome: 'Emily Blunt',
    foto: 'https://picsum.photos/seed/blunt/400/400',
    nascimento: '1983-02-23',
    sexo: 'Feminino',
    local: 'Londres, Inglaterra',
    descricao:
      'Emily Olivia Leah Blunt é uma atriz britânica nascida em 1983, em Londres. Ganhou destaque ao interpretar a assistente Emily em O Diabo Veste Prada e depois brilhou em filmes como Sicario e Um Lugar Silencioso. Em Oppenheimer, interpreta Kitty, esposa do cientista, e recebeu indicação ao Oscar.',
    filmes: [
      { titulo: 'O Diabo Veste Prada', data: '2006-06-30' },
      { titulo: 'Sicario', data: '2015-09-18' },
      { titulo: 'Um Lugar Silencioso', data: '2018-04-06' },
    ],
  },
  {
    id: '3',
    personagem: 'General Leslie Groves',
    nome: 'Matt Damon',
    foto: 'https://picsum.photos/seed/damon/400/400',
    nascimento: '1970-10-08',
    sexo: 'Masculino',
    local: 'Cambridge, Massachusetts, EUA',
    descricao:
      'Matthew Paige Damon é um ator, roteirista e produtor norte-americano nascido em 1970, em Cambridge, Massachusetts. Ganhou o Oscar de melhor roteiro original por Gênio Indomável, escrito ao lado de Ben Affleck. Também é famoso pela franquia Bourne e, em Oppenheimer, vive o general responsável pelo Projeto Manhattan.',
    filmes: [
      { titulo: 'Gênio Indomável', data: '1997-12-05' },
      { titulo: 'Os Infiltrados', data: '2006-10-06' },
      { titulo: 'Perdido em Marte', data: '2015-10-02' },
    ],
  },
  {
    id: '4',
    personagem: 'Lewis Strauss',
    nome: 'Robert Downey Jr.',
    foto: 'https://picsum.photos/seed/downey/400/400',
    nascimento: '1965-04-04',
    sexo: 'Masculino',
    local: 'Nova York, EUA',
    descricao:
      'Robert Downey Jr. é um ator e produtor norte-americano nascido em 1965, em Nova York. Superou fases difíceis na carreira e se tornou mundialmente famoso como Tony Stark, o Homem de Ferro, no universo Marvel. Por sua atuação como Lewis Strauss em Oppenheimer, conquistou o Oscar de melhor ator coadjuvante.',
    filmes: [
      { titulo: 'Homem de Ferro', data: '2008-05-02' },
      { titulo: 'Sherlock Holmes', data: '2009-12-25' },
      { titulo: 'Vingadores', data: '2012-05-04' },
    ],
  },
  {
    id: '5',
    personagem: 'Jean Tatlock',
    nome: 'Florence Pugh',
    foto: 'https://picsum.photos/seed/pugh/400/400',
    nascimento: '1996-01-03',
    sexo: 'Feminino',
    local: 'Oxford, Inglaterra',
    descricao:
      'Florence Pugh é uma atriz britânica nascida em 1996, em Oxford, na Inglaterra. Chamou atenção em filmes como Midsommar e Adoráveis Mulheres, que lhe rendeu uma indicação ao Oscar. Também integra o universo Marvel como Yelena Belova e, em Oppenheimer, interpreta Jean Tatlock, antigo amor do cientista.',
    filmes: [
      { titulo: 'Midsommar', data: '2019-07-03' },
      { titulo: 'Adoráveis Mulheres', data: '2019-12-25' },
      { titulo: 'Viúva Negra', data: '2021-07-09' },
    ],
  },
];

// ---------------------------------------------------------------
// SLIDER feito só com React Native (não depende de biblioteca nativa)
// ---------------------------------------------------------------
function Slider({ minimumValue = 0, maximumValue = 10, step = 1, value, onValueChange }) {
  const [largura, setLargura] = useState(0);

  const atualizar = (x) => {
    if (!largura) return;
    const p = Math.min(Math.max(x / largura, 0), 1);
    let v = minimumValue + p * (maximumValue - minimumValue);
    v = Math.round(v / step) * step;
    v = Math.min(maximumValue, Math.max(minimumValue, v));
    onValueChange(v);
  };

  const pos = ((value - minimumValue) / (maximumValue - minimumValue)) * largura;

  return (
    <View
      style={styles.sliderArea}
      onLayout={(e) => setLargura(e.nativeEvent.layout.width)}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderGrant={(e) => atualizar(e.nativeEvent.locationX)}
      onResponderMove={(e) => atualizar(e.nativeEvent.locationX)}
    >
      <View pointerEvents="none" style={styles.sliderTrilho} />
      <View pointerEvents="none" style={[styles.sliderPreenchido, { width: pos }]} />
      <View pointerEvents="none" style={[styles.sliderBolinha, { left: pos - 12 }]} />
    </View>
  );
}

// ---------------------------------------------------------------
// PARTE 1 - Tela de detalhes do filme + lista de atores
// ---------------------------------------------------------------
function TelaFilme({ onSelecionarAtor }) {
  return (
    <ScrollView style={styles.tela} contentContainerStyle={{ padding: 12 }}>
      <View style={styles.cardFilme}>
        <Image source={{ uri: filme.imagem }} style={styles.bannerFilme} />
        <Text style={styles.tituloFilme}>{filme.titulo}</Text>
        <Text style={styles.textoPequeno}>{filme.descricao}</Text>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.textoPequeno}>Orçamento: {filme.orcamento}</Text>
        <Text style={styles.textoPequeno}>Voto: {filme.voto}</Text>
        <Text style={styles.textoPequeno}>Duração: {filme.duracao} min.</Text>
        <Text style={styles.textoPequeno}>Lançamento: {filme.lancamento}</Text>
      </View>

      <Text style={styles.secao}>Atores</Text>

      {atores.map((ator) => (
        <TouchableOpacity
          key={ator.id}
          style={styles.itemLista}
          onPress={() => onSelecionarAtor(ator)}
        >
          <Image source={{ uri: ator.foto }} style={styles.fotoRedonda} />
          <View style={{ flex: 1 }}>
            <Text style={styles.itemTitulo}>{ator.personagem}</Text>
            <Text style={styles.itemSub}>{ator.nome}</Text>
          </View>
          <Text style={styles.seta}>›</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

// ---------------------------------------------------------------
// PARTE 2 - Tela de detalhes do ator (interação ao clicar na lista)
// ---------------------------------------------------------------
function TelaAtor({ ator, onVoltar }) {
  return (
    <ScrollView style={styles.tela} contentContainerStyle={{ padding: 12 }}>
      <TouchableOpacity onPress={onVoltar} style={styles.botaoVoltar}>
        <Text style={styles.botaoVoltarTexto}>← Voltar</Text>
      </TouchableOpacity>

      <View style={styles.cardFilme}>
        <Image source={{ uri: ator.foto }} style={styles.fotoAtor} />
        <Text style={styles.tituloFilme}>{ator.nome}</Text>
        <Text style={styles.textoPequeno}>{ator.descricao}</Text>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.textoPequeno}>Sexo: {ator.sexo}</Text>
        <Text style={styles.textoPequeno}>
          Data de Nascimento: {ator.nascimento}
        </Text>
        <Text style={styles.textoPequeno}>
          Lugar de Nascimento: {ator.local}
        </Text>
      </View>

      <Text style={[styles.secao, { color: 'red', textAlign: 'center' }]}>
        Filmes
      </Text>

      {ator.filmes.map((f, i) => (
        <View key={i} style={styles.itemLista}>
          <Image source={{ uri: ator.foto }} style={styles.fotoRedonda} />
          <View style={{ flex: 1 }}>
            <Text style={styles.itemTitulo}>{f.titulo}</Text>
            <Text style={styles.itemSub}>{f.data}</Text>
          </View>
          <Text style={styles.seta}>›</Text>
        </View>
      ))}
    </ScrollView>
  );
}

// ---------------------------------------------------------------
// PARTE 3 - Formulário
// ---------------------------------------------------------------
function TelaFormulario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cidade, setCidade] = useState('');
  const [comentario, setComentario] = useState('');
  const [filmeFav, setFilmeFav] = useState('Oppenheimer');
  const [genero, setGenero] = useState('Drama');
  const [nota, setNota] = useState(5);
  const [horas, setHoras] = useState(2);
  const [notificacoes, setNotificacoes] = useState(false);
  const [jaAssistiu, setJaAssistiu] = useState(true);

  const enviar = () => {
    Alert.alert(
      'Dados enviados',
      `Nome: ${nome}\nE-mail: ${email}\nCidade: ${cidade}\nComentário: ${comentario}\n` +
        `Filme: ${filmeFav}\nGênero: ${genero}\nNota: ${nota.toFixed(1)}\n` +
        `Horas por semana: ${horas}\nNotificações: ${notificacoes ? 'Sim' : 'Não'}\n` +
        `Já assistiu: ${jaAssistiu ? 'Sim' : 'Não'}`
    );
  };

  const limpar = () => {
    setNome('');
    setEmail('');
    setCidade('');
    setComentario('');
    setFilmeFav('Oppenheimer');
    setGenero('Drama');
    setNota(5);
    setHoras(2);
    setNotificacoes(false);
    setJaAssistiu(true);
  };

  return (
    <ScrollView style={styles.tela} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.tituloForm}>Avaliação de Filmes</Text>

      {/* 4 inputs de texto */}
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Digite seu nome" />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Cidade</Text>
      <TextInput style={styles.input} value={cidade} onChangeText={setCidade} placeholder="Digite sua cidade" />

      <Text style={styles.label}>Comentário</Text>
      <TextInput
        style={styles.input}
        value={comentario}
        onChangeText={setComentario}
        placeholder="Escreva um comentário"
      />

      {/* 2 pickers */}
      <Text style={styles.label}>Filme favorito</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={filmeFav} onValueChange={setFilmeFav}>
          <Picker.Item label="Oppenheimer" value="Oppenheimer" />
          <Picker.Item label="Interestelar" value="Interestelar" />
          <Picker.Item label="A Origem" value="A Origem" />
          <Picker.Item label="Dunkirk" value="Dunkirk" />
        </Picker>
      </View>

      <Text style={styles.label}>Gênero preferido</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={genero} onValueChange={setGenero}>
          <Picker.Item label="Drama" value="Drama" />
          <Picker.Item label="Comédia" value="Comédia" />
          <Picker.Item label="Ação" value="Ação" />
          <Picker.Item label="Romance" value="Romance" />
        </Picker>
      </View>

      {/* 2 sliders */}
      <Text style={styles.label}>Nota para o filme: {nota.toFixed(1)}</Text>
      <Slider minimumValue={0} maximumValue={10} step={0.5} value={nota} onValueChange={setNota} />

      <Text style={styles.label}>Horas de filmes por semana: {horas}</Text>
      <Slider minimumValue={0} maximumValue={20} step={1} value={horas} onValueChange={setHoras} />

      {/* 2 switches */}
      <View style={styles.linhaSwitch}>
        <Text style={styles.label}>Receber notificações</Text>
        <Switch value={notificacoes} onValueChange={setNotificacoes} />
      </View>

      <View style={styles.linhaSwitch}>
        <Text style={styles.label}>Já assistiu ao filme</Text>
        <Switch value={jaAssistiu} onValueChange={setJaAssistiu} />
      </View>

      {/* 2 botões com interação */}
      <View style={{ marginTop: 16 }}>
        <Button title="Enviar" onPress={enviar} />
      </View>
      <View style={{ marginTop: 10, marginBottom: 30 }}>
        <Button title="Limpar" color="#c0392b" onPress={limpar} />
      </View>
    </ScrollView>
  );
}

// ---------------------------------------------------------------
// APP (navegação simples por estado, sem bibliotecas extras)
// ---------------------------------------------------------------
export default function App() {
  const [aba, setAba] = useState('filmes'); // 'filmes' | 'form'
  const [atorSelecionado, setAtorSelecionado] = useState(null);

  const titulo =
    aba === 'form' ? 'Formulário' : atorSelecionado ? 'Ator' : 'Detalhes';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTexto}>{titulo}</Text>
      </View>

      <View style={{ flex: 1 }}>
        {aba === 'form' ? (
          <TelaFormulario />
        ) : atorSelecionado ? (
          <TelaAtor ator={atorSelecionado} onVoltar={() => setAtorSelecionado(null)} />
        ) : (
          <TelaFilme onSelecionarAtor={setAtorSelecionado} />
        )}
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab} onPress={() => setAba('filmes')}>
          <Text style={[styles.tabTexto, aba === 'filmes' && styles.tabAtiva]}>Filme e Atores</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setAba('form')}>
          <Text style={[styles.tabTexto, aba === 'form' && styles.tabAtiva]}>Formulário</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f0f4', paddingTop: 30 },
  header: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTexto: { fontSize: 18, fontWeight: '600' },
  tela: { flex: 1 },
  cardFilme: {
    backgroundColor: '#f7f2fa',
    borderRadius: 14,
    padding: 8,
    marginBottom: 12,
    elevation: 3,
  },
  bannerFilme: { width: '100%', height: 170, borderRadius: 14 },
  fotoAtor: { width: '100%', height: 300, borderRadius: 10, resizeMode: 'cover' },
  tituloFilme: { fontSize: 22, marginTop: 6 },
  textoPequeno: { fontSize: 13, color: '#222', marginVertical: 1 },
  cardInfo: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  secao: { fontSize: 20, marginBottom: 8 },
  itemLista: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#fffbff',
  },
  fotoRedonda: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  itemTitulo: { fontSize: 15 },
  itemSub: { fontSize: 12, marginTop: 4 },
  seta: { fontSize: 24, color: '#333' },
  botaoVoltar: { marginBottom: 8 },
  botaoVoltarTexto: { fontSize: 16, color: '#2962ff' },
  tituloForm: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  label: { fontSize: 15, marginTop: 10, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  linhaSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderArea: { height: 40, justifyContent: 'center' },
  sliderTrilho: { height: 4, borderRadius: 2, backgroundColor: '#ccc' },
  sliderPreenchido: { position: 'absolute', height: 4, borderRadius: 2, backgroundColor: '#2962ff' },
  sliderBolinha: { position: 'absolute', width: 24, height: 24, borderRadius: 12, backgroundColor: '#2962ff', top: 8 },
  tabs: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  tab: { flex: 1, padding: 14, alignItems: 'center' },
  tabTexto: { color: '#555' },
  tabAtiva: { color: '#2962ff', fontWeight: 'bold' },
});
