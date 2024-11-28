---
title: FastDeploy 服务化部署
date: 2024-09-19 17:00:00
tags:
  - web
categories:
  - Python
---

# FastDeploy 服务化部署

## 文件夹准备

```shell
mkdir PaddlePaddle
cd PaddlePaddle
mkdir FastDeploy
cd FastDeploy
```

## 文件下载

```shell
# 下载仓库代码
# 下载部署示例代码
git clone https://github.com/PaddlePaddle/FastDeploy.git
cd  FastDeploy/examples/vision/ocr/PP-OCR/serving/fastdeploy_serving

# 如果您希望从PaddleOCR下载示例代码，请运行
git clone https://github.com/PaddlePaddle/PaddleOCR.git
# 注意：如果当前分支找不到下面的fastdeploy测试代码，请切换到dygraph分支
git checkout dygraph
cd PaddleOCR/deploy/fastdeploy/serving/fastdeploy_serving

# 下载模型,图片和字典文件
wget https://paddleocr.bj.bcebos.com/PP-OCRv3/chinese/ch_PP-OCRv3_det_infer.tar
tar xvf ch_PP-OCRv3_det_infer.tar && mv ch_PP-OCRv3_det_infer 1
mv 1/inference.pdiparams 1/model.pdiparams && mv 1/inference.pdmodel 1/model.pdmodel
mv -b 1 models/det_runtime/ && rm -rf ch_PP-OCRv3_det_infer.tar

wget https://paddleocr.bj.bcebos.com/dygraph_v2.0/ch/ch_ppocr_mobile_v2.0_cls_infer.tar
tar xvf ch_ppocr_mobile_v2.0_cls_infer.tar && mv ch_ppocr_mobile_v2.0_cls_infer 1
mv 1/inference.pdiparams 1/model.pdiparams && mv 1/inference.pdmodel 1/model.pdmodel
mv -b 1 models/cls_runtime/ && rm -rf ch_ppocr_mobile_v2.0_cls_infer.tar

wget https://paddleocr.bj.bcebos.com/PP-OCRv3/chinese/ch_PP-OCRv3_rec_infer.tar
tar xvf ch_PP-OCRv3_rec_infer.tar && mv ch_PP-OCRv3_rec_infer 1
mv 1/inference.pdiparams 1/model.pdiparams && mv 1/inference.pdmodel 1/model.pdmodel
mv -b 1 models/rec_runtime/ && rm -rf ch_PP-OCRv3_rec_infer.tar

mkdir models/pp_ocr/1 && mkdir models/rec_pp/1 && mkdir models/cls_pp/1

wget https://gitee.com/paddlepaddle/PaddleOCR/raw/release/2.6/ppocr/utils/ppocr_keys_v1.txt
mv ppocr_keys_v1.txt models/rec_postprocess/1/

wget https://gitee.com/paddlepaddle/PaddleOCR/raw/release/2.6/doc/imgs/12.jpg
```

## CPU 镜像

CPU 镜像仅支持 Paddle/ONNX 模型在 CPU 上进行服务化部署，支持的推理后端包括 OpenVINO、Paddle Inference 和 ONNX Runtime

```shell
sudo docker pull registry.baidubce.com/paddlepaddle/fastdeploy:1.0.7-cpu-only-21.10
```

## 使用服务化 Docker

```shell
sudo docker run -dit --net=host --name fastdeploy --shm-size="1g" -v $PWD:/ocr_serving registry.baidubce.com/paddlepaddle/fastdeploy:1.0.7-cpu-only-21.10 bash
sudo docker exec -it -u root fastdeploy bash
```

## 服务端的使用

### 安装(在 docker 内)

```shell
ldconfig
apt-get install libgl1
```

### 配置修改

当前默认配置在 GPU 上运行， 如果要在 CPU 或其他推理引擎上运行。 需要修改 models/runtime/config.pbtxt 中配置

- 参考： https://blog.csdn.net/qq_30946821/article/details/131408693
- https://github.com/PaddlePaddle/FastDeploy/blob/develop/serving/docs/zh_CN/model_configuration.md

```shell
instance_group [
  {
    # The number of instances is 1
    count: 1
    # Use GPU, CPU inference option is:KIND_CPU
    kind: KIND_GPU
    # The instance is deployed on the 0th GPU card
    gpus: [0]
  }
]

改为
instance_group [
  {
    # The number of instances is 1
    count: 1
    # Use GPU, CPU inference option is:KIND_CPU
    kind: KIND_CPU
  }
]
```

### 启动服务端(在 docker 内)

```shell
fastdeployserver --model-repository=/ocr_serving/models
```

参数:

model-repository(required): 整套模型 streaming_pp_tts 存放的路径.
http-port(optional): HTTP 服务的端口号. 默认: 8000. 本示例中未使用该端口.
grpc-port(optional): GRPC 服务的端口号. 默认: 8001.
metrics-port(optional): 服务端指标的端口号. 默认: 8002. 本示例中未使用该端口.

# 客户端的使用

## 安装

```shell
pip install tritonclient[all]
```

## 发送请求

```python
# client.py
...
```

# Serving 可视化部署

## 在容器中使用如下命令可以安装 VisualDL

```shell
python3 -m pip install --upgrade pip
python3 -m pip install --upgrade visualdl>=2.5.0 --root-user-action=ignore mediapipe
```

## 使用方式

使用命令

接着在浏览器打开http://127.0.0.1:8080（如果浏览器和启动visualdl的机器不同，请替换为启动visualdl机器的ip），即可以看到FastDeploy
Server 的功能选项卡。

```shell
visualdl --host 0.0.0.0 --port 8090
```

## 功能说明

VisualDL 的 Serving 可视化部署功能主要提供模型库载入和编辑、serving 管理监控这两方面的功能。
下面以 examples 目录为示例进行功能说明，可以先通过下列命令来获取示例所需要的资源并开启 visualdl。

```shell
git clone https://github.com/PaddlePaddle/FastDeploy.git
cd FastDeploy/examples
visualdl --host 0.0.0.0 --port 8080
```

进入 FastDeployServer 的功能选项卡后，
