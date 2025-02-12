const ModuleMovie = require("../modules/productModule")
const getAllData = async (req,res)=>{
    try {
      const products = await ModuleMovie.find({})
      if (!products) {
        res.status(404).send({
            error: "products didn`t succesfuly geted!!"
        })
      }
      res.status(200).send({
        data: products,
        message: "All products succesfuly geted!!",
        error: null
      })     
    } catch (error) {
        res.status(500).send({
            error: "error required!!"
        })
    }
}
const getDataByID = async (req, res) => {
    const { id }  = req.params;
  try {
    const products = await ModuleMovie.findById(id);
    if (!products) {
      res.status(404).send({
        error: "product didn`t succesfuly geted!!",
      });
    }
    res.status(200).send({
      data: products,
      message: "product succesfuly geted!!",
      error: null,
    });
  } catch (error) {
    res.status(500).send({
      error: "error required!!",
    });
  }
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await ModuleMovie.findByIdAndDelete(id);
    if (!products) {
      res.status(404).send({
        error: "product didn`t succesfuly deleted!!",
      });
    }
    res.status(200).send({
      data: products,
      message: "product succesfuly deleted!!",
      error: null,
    });
  } catch (error) {
    res.status(500).send({
      error: "error required!!",
    });
  }
};

const postData = async (req, res) => {
  try {
    const imagePath = req.file.path;
    const products = ModuleMovie({
      ...req.body,
      image: `http://localhost:8080/${imagePath}`,  
    });
    await products.save()
    if (!products) {
      res.status(404).send({
        error: "product didn`t succesfuly posted!!",
      });
    }
    res.status(200).send({
      data: products,
      message: "product succesfuly posted!!",
      error: null,
    });
  } catch (error) {
    res.status(500).send({
      error: "error required!!",
    });
  }
};

const updateData = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await ModuleMovie.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "product not found!" });
    }
    res.json({
      updatedProduct: updatedProduct,
      message: "product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
        error: "error required from update!!"
    });
  }
};


module.exports = {
  getAllData,
  getDataByID,
  deleteData,
  postData,
  updateData,
};