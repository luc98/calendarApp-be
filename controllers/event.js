const { response } = require("express");
const Evento = require("../models/Evento");
//* {ok:true, msg: 'get'}

const getEvento = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");

  return res.status(400).json({
    ok: true,
    eventos,
  });
};

//* {ok:true, msg: 'crear'}

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable al admin",
    });
  }
};

//* {ok:true, msg: 'actualizar'}

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return  res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id",
      });
    }

    if (evento.user.toString() !== uid) {
      return  res.status(401).json({
            ok: false,
            msg: "No tiene autorizacion para editarlo",
          });
        
    }
    const nuevoEvento = {
        ...req.body,
        user:uid
    }
    const eventoActualizado = await Evento.findByIdAndUpdate( eventoId,nuevoEvento,{new: true} );

    res.json({
        ok: true,
        evento: eventoActualizado
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable al admin",
    });
  }

  return res.status(200).json({
    ok: true,
    msg: "actualizar",
    eventoId,
  });
};

//* {ok:true, msg: 'borrar'}

const eliminarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
         return res.status(404).json({
            ok: false,
            msg: "Evento no existe por ese id",
          });
        }
    
        if (evento.user.toString() !== uid) {
          return res.status(401).json({
                ok: false,
                msg: "No tiene autorizacion para eliminarlo",
              });
            
        }
     await Evento.findByIdAndRemove(eventoId);
     //.findByIdAndUpdate( eventoId,nuevoEvento,{new: true} );
     res.json({
        ok: true
        
      });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "hable al admin",
          });
    }

};

module.exports = {
  getEvento,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
