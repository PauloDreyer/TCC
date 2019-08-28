import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    // Containers
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F1F2F3',
        paddingTop: 0,

    },

    infoContainer: {
        position:'relative',
        bottom: 0,
        width: '100%',
        marginTop: 20,
        paddingHorizontal: 0,
        backgroundColor: '#F1F2F3'
    },

    infoContainer2: {
        position:'relative',
        bottom: 0,
        width: '100%',
        height: '91%',
        marginTop: 20,
        paddingHorizontal: 0,
        backgroundColor: '#F1F2F3'
    },
    
    cameraContainer: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignSelf:'center'
    },

    footerContainer:{
        flex: 2,
        width: '100%', 
        height: 60, 
        marginTop: 0,
        position: 'relative',
        backgroundColor: '#F1F2F3'
    },

    QrCodeContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    topQrCodeContainer: {
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    bottomQrCodeContainer: {
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingBottom: Dimensions.get('window').width * 0.6
    },

    sideQrCodeContainer: {
        flex: 2,
        width: Dimensions.get('window').width,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    cameraQrCode: {
        height: 200,
        width: 200,
        borderWidth: 2.5,
        justifyContent: 'center',
        borderColor: '#26A557',
    },
    
    //Logos
    logoContainer: {
        alignItems: 'baseline',
        justifyContent: 'center',
        marginTop: 40
    },

    logo: {
        width: 100,
        height: 150,
        padding: 20
    },

    //ViewRow
    viewRow:{
        flexDirection:'row',
        width:'100%',
        alignSelf:'center',
        justifyContent: 'center',
    },
    
    //FlatList
    viewRowFlat:{
        flexDirection:'row',
        width:'100%',
        alignSelf:'flex-start',
        justifyContent: 'flex-start',
    },

    viewFlat:{
        height: 50,
        width: '70%',
        flex:2,
        alignSelf:'flex-start',
        justifyContent: 'flex-start',
    },

    separadorFlatList:{
        height: 1,
        marginTop: 10,
        marginBottom: 5,
        width: '100%',
        backgroundColor: '#2A81D3',
        fontWeight: 'bold',
    },

    //Header
    header:{
        backgroundColor: '#26A557',
        height: 50,
        textAlign: 'center',
    },

    headerLiberacao:{
        backgroundColor: 'transparent',
        margin: 10,
        height: 100,
        textAlign: 'center',
    },

    //Text Inputs
    inputBox: {
        width: '85%',
        height: 40,
        backgroundColor:'transparent',
        borderRadius: 10,
        fontSize: 18,
        color: '#1E273D',
        alignSelf: 'center',
        marginBottom: 5,
        paddingHorizontal: 10
    },

    inputBoxCenter: {
        width: '30%',
        height: 40,
        backgroundColor:'transparent',
        borderRadius: 10,
        fontSize: 18,
        color: '#1E273D',
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 5,
    },

    inputBuscaMap:{
        backgroundColor: '#ffffff',
        height: 45,
        width: 300,
        borderRadius: 10,
        alignItems:'flex-start',
        bottom: '85%',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#818185',
    
    },

    //Buttons
    buttonBox: { 
        backgroundColor:'#F7C744',
        borderRadius: 10,
        height: 60,
        width:'85%',
        paddingVertical: 17,
        marginTop: 10,
        marginBottom: 0,
        alignSelf:'center'
    },

    buttonMaisMenos: { 
        backgroundColor:'#2A81D3',
        borderRadius: 5,
        height: 30,
        width: 50,
        alignSelf:'center',
        textAlign: 'center',
        margin: 10,
    },

    buttonTextLogar: {
        textAlign: 'center',
        alignSelf:'center',
        color: 'rgb(32, 53, 70)',
        fontWeight: 'bold',
        fontSize: 18,
    },

    buttonTextRota: {
        textAlign: 'center',
        alignSelf:'center',
        color: 'rgb(32, 53, 70)',
        fontWeight: 'bold',
        fontSize: 18,
    },

    buttonTextMaisMenos: {
        textAlign: 'center',
        alignSelf:'center',
        color: 'rgb(32, 53, 70)',
        fontWeight: 'bold',
        fontSize: 18,
    },

    buttonBoxFacebook: { 
        backgroundColor:'#3b5998',
        textAlign:'center',
        borderRadius: 25,
        height: 40,
        width: 100,
        marginLeft: 50,
    },

    buttonBoxGoogle: { 
        backgroundColor:'#ffffff',
        textAlign:'center',
        borderRadius: 25,
        height: 40,
        width: 100,
        marginRight: 50,
    },

    buttonBoxConfirmar: { 
        backgroundColor:'#2A81D3',
        borderRadius: 10,
        paddingVertical: 17,
        marginBottom: 20,
        width: '85%',
        height: 60,
        alignSelf:'center'
    },

    buttonBoxReservar: { 
        backgroundColor:'#2A81D3',
        borderRadius: 10,
        paddingVertical: 17,
        width: '85%',
        height: 60,
        alignSelf:'center'
    },

    buttonBoxRota: { 
        backgroundColor:'#D6642F',
        borderRadius: 5,
        width: 44,
        height: 44,
        alignSelf:'center'
    },

    buttonBoxAlterar: { 
        backgroundColor:'#2A81D3',
        borderRadius: 10,
        paddingVertical: 17,
        margin: 10,
        width: '40%',
        height: 60,
        alignSelf:'center'
    },

    buttonBoxCancelar: { 
        backgroundColor:'#D63230',
        borderRadius: 10,
        paddingVertical: 17,
        margin: 10,
        width: '40%',
        height: 60,
        alignSelf:'center'
    },

    buttonBoxValidar: { 
        backgroundColor:'#D6642F',
        borderRadius: 10,
        paddingBottom: 10,
        width: '50%',
        height: 50,
        marginTop: 5,
        justifyContent: 'center',
        alignSelf:'center'
    },

    // Labels
    label: {
        color: '#1E273D',
        backgroundColor: 'transparent',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 16,
        width: '85%',
        alignSelf: 'center',
        paddingHorizontal: 10
    },

    labelNormal: {
        color: '#1E273D',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: 18,
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 10
    },

    labelClaro: {
        color: '#F1F2F3',
        backgroundColor: 'transparent',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 16,
        width: '85%',
        alignSelf: 'center',
        paddingHorizontal: 10
    },

    labelCentralizado: {
        color: '#1E273D',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        width: '100%',
        alignSelf: 'center',
        marginTop: 10,
    },

    labelCentralizadoClaro: {
        color: '#F1F2F3',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },

    labelTitulo: {
        color: '#1E273D',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        width: '85%',
        alignSelf: 'center',
        marginTop: 0,
    },

    labelTitulo1: {
        color: '#1E273D',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        width: '85%',
        alignSelf: 'center',
        marginTop: 1,
    },

    labelTitulo2: {
        color: '#BABABA',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        width: '85%',
        alignSelf: 'center',
        marginTop: 0
    },

    labelTitulo3: {
        color: '#2A81D3',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        width: '85%',
        alignSelf: 'center',
        marginTop: 5
    },

    labelTitulo4: {
        color: '#D63230',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        width: '85%',
        alignSelf: 'center',
        marginTop: 5
    },

    labelTitulo5: {
        color: '#26A557',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 5,
    },

    labelCount: {
        color: '#1E273D',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center',
        width: 30
    },

    labelRow: {
        color: '#F1F2F3',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center',
        width: '40%',
        marginTop: 0,
        marginLeft: 5,
        marginRight: 5,
    },

    //DataPickers
    dataPickerContainer: {
        position:'relative',
        bottom: 0,
        width: '85%',
        alignSelf: 'center',
        paddingHorizontal: 0,
        marginTop: 3,
        padding: 15,
        height: 90,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: '#26A557',
    },

    dataPickerContainerConsulta: {
        position:'relative',
        bottom: 0,
        width: '50%',
        alignSelf: 'center',
        marginTop: 3,
        paddingTop: 10,
        paddingBottom: 10,
        height: 70,
        borderRadius: 10,
        backgroundColor: '#26A557',
    },

    dataPicker: {
        width: '40%',
        height: 40,
        position:'relative',
        alignSelf: 'center',
        margin: 5,
    },

    dataPickerConsulta: {
        width: '70%',
        position:'relative',
        alignSelf: 'center',
        margin: 5,
    },

    // Rede Sociais
    redeSociais:{
        flexDirection:'row',
        width:300,
        marginTop: 10,
        marginBottom: 10,
        alignSelf:'center'
    },

    ImageIcon:{
        alignSelf:'center',
        height: 40,
    },
    
    cadastar: {
        color: '#1E273D',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop:10
    },

    // Maps
    containerMap: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        padding: 0,
        backgroundColor: '#008641'
      },
    
    map: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
      },
    
    //Slider
    slider:{
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'stretch',
        height: 30,
    },

    //Switch
    switch:{
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        height: 30,
    },
    
    //Estrelas
    estrela: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
  
    imagemEstrela: {
        marginTop: 5,
        width: 30,
        height: 30,
        resizeMode: 'cover',
    },

    //Filtros
    filtro:{
        marginTop: 10,
        padding: 15,
        height: 100,
        width: '85%',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: '#26A557',
        alignSelf:'center'
      },
    
    filtroCidade:{
        marginTop: 10,
        padding: 15,
        height: 200,
        width: '85%',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: '#26A557',
        alignSelf:'center'
    },

    filtroSwitch:{
        marginTop: 10,
        padding: 12,
        height: 50,
        width: '85%',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: '#26A557',
        alignSelf:'center'
    },

    filtroVagas:{
        marginTop: 3,
        padding: 2,
        height: 160,
        width: '85%',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        backgroundColor: '#26A557',
        alignSelf:'center'
    },

    tituloPagina: {
        color: '#26A557',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        marginTop:10
    },
    
    //FlatList
    flatList: {
        width: '85%',
        backgroundColor:'transparent',
        color: '#1E273D',
        alignSelf: 'center',
    },

    itemFlatList1: {
        backgroundColor:'transparent',
        fontSize: 18,
        color: '#1E273D',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },

    itemFlatList2: {
        backgroundColor:'transparent',
        fontSize: 12,
        color: '#1E273D',
        alignSelf: 'flex-start',
        marginBottom: 2,
    },

    //QrCode
    qrCode:{
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 50,
        height: 250,
        width: 250,
    },

    retornoQrCode:{
        backgroundColor:'transparent',
        fontSize: 18,
        color: '#1E273D',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },

    liberacaoQrCode:{
        backgroundColor:'transparent',
        fontSize: 26,
        color: '#26A557',
        fontWeight: 'bold',
        alignSelf: 'center',
    },

});

export default styles;