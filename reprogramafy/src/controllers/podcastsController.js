const podsJson = require("../models/podcasts.json")

const getAllPods = (req,res)=> {
    try {
        res.status(200).json([{
            podcasts : podsJson
        }])
    } catch (err) {
        res.status(500).send([{
            message : "Erro no server"
        }])
    }
}

const getTopics = (req,res) => {
    const topicRequest = req.query.topic;
    const topicFilter = podsJson.filter((pods) => pods.topic.includes(topicRequest))
    if(topicFilter.length > 0) {
        res.status(200).send(topicFilter)
    } else {
        res.status(404).send([{
            message: "Not found / Podcast não encontrado"
        }])
    }
}

const addPods = (req,res) => {
    try {
        let nameRequest = req.body.name;
        let podcasterRequest = req.body.podcaster;
        let topicRequest = req.body.topic;
        let starsRequest = req.body.stars;

        let newPodcast = {
            id: Math.floor(Date.now() * Math.random()).toString(36),
            name: nameRequest,
            podcaster: podcasterRequest,
            topic: topicRequest,
            stars: starsRequest

        }
        podsJson.push(newPodcast);
        res.status(201).json ([{
            message: "Novo podcaste cadastrado.",
            newPodcast
        }])
    } catch (error) {
        console.log(error)
        res.status(500).send([{
            message: "Erro interno ao cadastrar"
        }])
    }
}

const updatePods = (req, res) => {
    const idRequest = req.params.id
    const starsRequest = req.body.stars
    starsFind = podsJson.find((podcast) => podcast.id == idRequest)

    if (starsFind) {
        starsFind.stars = starsRequest
        res.status(200).json([{
            message: "Classificação atualizada com sucesso",
            podsJson
        }])
        
    } else {
        res.status(404).json([{
            message: "Não foi modificado."
        }])
        
    }
}

const deletePods = (req, res) => {
    const idRequest = req.params.id
    const indicePods = podsJson.findIndex((podcast) => podcast.id == idRequest)

    podsJson.splice(indicePods, 1)

    if (indicePods) {
        res.status(200).json([{
            message: "O podcast selecionado foi deletado.",
            "podcast deletado" : idRequest, podsJson
        }])
        
    } else {
        res.status(404).send([{
            message: "Not foun / Podcast não deletado."
        }])
        
    }
}


module.exports={
    getAllPods,
    getTopics,
    addPods,
    updatePods,
    deletePods,
}