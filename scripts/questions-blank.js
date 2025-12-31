// 填空题题库 - 自然语言处理
// 注意：这是填空题题库的JavaScript版本
const blankQuestions = [
    {
        "type": "blank",
        "question": "在NLP中，将连续的字符序列转换为离散的词语序列的过程称为____。",
        "answer": "分词",
        "explanation": "分词(Tokenization)是NLP中的基础任务，用于将文本切分成有意义的单元。"
    },
    {
        "type": "blank",
        "question": "注意力机制的核心思想是为输入的不同部分分配不同的____。",
        "answer": "权重",
        "explanation": "注意力机制通过学习为输入的不同部分分配不同的权重，使模型能够关注重要信息。"
    },
    {
        "type": "blank",
        "question": "TF-IDF中的TF表示词频，IDF表示____。",
        "answer": "逆文档频率",
        "explanation": "IDF(Inverse Document Frequency)表示逆文档频率，用于衡量词的重要性。"
    },
    {
        "type": "blank",
        "question": "Word2Vec包括两种模型：CBOW和____。",
        "answer": "Skip-gram",
        "explanation": "Word2Vec包括CBOW(Continuous Bag of Words)和Skip-gram两种模型。"
    },
    {
        "type": "blank",
        "question": "在Transformer中，多头注意力机制可以让模型关注不同____空间的信息。",
        "answer": "表示",
        "explanation": "多头注意力机制允许模型在不同的表示子空间中学习不同的注意力模式。"
    },
    {
        "type": "blank",
        "question": "BERT的全称是____。",
        "answer": "Bidirectional Encoder Representations from Transformers",
        "explanation": "BERT代表来自Transformers的双向编码器表示。"
    },
    {
        "type": "blank",
        "question": "GPT模型采用的训练方式是____语言模型。",
        "answer": "自回归",
        "explanation": "GPT采用自回归语言模型，从左到右生成文本。"
    },
    {
        "type": "blank",
        "question": "在序列标注任务中，____算法常用于命名实体识别。",
        "answer": "CRF",
        "explanation": "条件随机场(CRF)是序列标注任务中常用的算法，特别适合命名实体识别。"
    },
    {
        "type": "blank",
        "question": "循环神经网络的一个重要变体____能够有效解决梯度消失问题。",
        "answer": "LSTM",
        "explanation": "长短期记忆网络(LSTM)通过门控机制有效解决了RNN的梯度消失问题。"
    },
    {
        "type": "blank",
        "question": "在NLP中，将词语映射为稠密向量的技术称为____。",
        "answer": "词嵌入",
        "explanation": "词嵌入(Word Embedding)是将词语表示为稠密向量的技术。"
    },
    {
        "type": "blank",
        "question": "Seq2Seq模型由____和解码器两部分组成。",
        "answer": "编码器",
        "explanation": "Seq2Seq模型包括编码器(Encoder)和解码器(Decoder)两个主要组件。"
    },
    {
        "type": "blank",
        "question": "在文本分类中，____是衡量模型性能的常用指标。",
        "answer": "F1分数",
        "explanation": "F1分数是精确率和召回率的调和平均，是文本分类的重要评估指标。"
    },
    {
        "type": "blank",
        "question": "命名实体识别任务通常采用____标注方案。",
        "answer": "BIO",
        "explanation": "BIO标注方案将实体标注为Begin、Inside、Outside三类，是NER的标准方案。"
    },
    {
        "type": "blank",
        "question": "在机器翻译中，____分数是评估翻译质量的常用指标。",
        "answer": "BLEU",
        "explanation": "BLEU(Bilingual Evaluation Understudy)是机器翻译质量评估的标准指标。"
    },
    {
        "type": "blank",
        "question": "Transformer模型的核心是____机制。",
        "answer": "自注意力",
        "explanation": "自注意力(Self-Attention)机制是Transformer模型的核心创新。"
    },
    {
        "type": "blank",
        "question": "词嵌入是一种将词语映射为____的技术。",
        "answer": "密集向量"
    },
    {
        "type": "blank",
        "question": "在情感分析中，使用深度学习模型时，通常需要一个包含正负例的____。",
        "answer": "训练集"
    },
    {
        "type": "blank",
        "question": "在文本分类任务中，使用卷积神经网络（CNN）时，卷积层的目的是提取文本中的____。",
        "answer": "特征"
    },
    {
        "type": "blank",
        "question": "TF-IDF的缩写中，\"TF\"代表词语在文档中的____。",
        "answer": "频率"
    },
    {
        "type": "blank",
        "question": "在机器翻译中，Seq2Seq模型通常包含两个主要部分：编码器用于将输入序列映射为____，解码器用于生成输出序列。",
        "answer": "隐藏状态"
    },
    {
        "type": "blank",
        "question": "命名实体识别旨在识别文本中具有特定意义的____。",
        "answer": "命名实体"
    },
    {
        "type": "blank",
        "question": "在文本生成任务中，GAN的生成器的作用是生成看起来与____相似的文本。",
        "answer": "真实文本"
    },
    {
        "type": "blank",
        "question": "在情感分析中，使用词袋模型时，文本被表示为一个包含词语____的向量。",
        "answer": "出现次数"
    },
    {
        "type": "blank",
        "question": "BLEU评估指标主要用于评估____。",
        "answer": "机器翻译"
    },
    {
        "type": "blank",
        "question": "预训练模型（如BERT）通过在大规模语料库上进行训练，从而捕捉词语的____。",
        "answer": "上下文信息"
    },
    {
        "type": "blank",
        "question": "语音识别的目标是将____转换为文本。",
        "answer": "语音"
    },
    {
        "type": "blank",
        "question": "在文本生成任务中，beam search的目的是生成多个翻译____并选择最佳解。",
        "answer": "候选"
    },
    {
        "type": "blank",
        "question": "情感分析中的\"极性\"通常指文本的____倾向。",
        "answer": "情感"
    },
    {
        "type": "blank",
        "question": "在文本分类中，交叉验证的目的是为了更好地评估模型在____数据上的性能.",
        "answer": "测试"
    },
    {
        "type": "blank",
        "question": "主题模型的目标是发现文本中隐藏的____。",
        "answer": "主题"
    },
    {
        "type": "blank",
        "question": "在深度学习中，Dropout层通常用于防止模型____。",
        "answer": "过拟合"
    },
    {
        "type": "blank",
        "question": "在机器翻译任务中，Attention机制的目的是使模型能够更好地关注输入序列中的重要____。",
        "answer": "词"
    },
    {
        "type": "blank",
        "question": "在情感分析中，使用卷积神经网络（CNN）时，池化层的目的是____。",
        "answer": "池化"
    },
    {
        "type": "blank",
        "question": "词袋模型中，每个文档可以表示为一个包含词语出现次数的____。",
        "answer": "向量"
    },
    {
        "type": "blank",
        "question": "在文本生成任务中，递归神经网络（RNN）被广泛应用于处理____。",
        "answer": "序列数据"
    },
    {
        "type": "blank",
        "question": "在命名实体识别中，\"MISC\"代表____。",
        "answer": "其他"
    },
    {
        "type": "blank",
        "question": "在文本分类中，使用逻辑回归时，权重参数表示每个词语的____。",
        "answer": "重要性"
    },
    {
        "type": "blank",
        "question": "在自然语言处理中，模型的泛化能力是指模型在____数据上的表现。",
        "answer": "所有"
    },
    {
        "type": "blank",
        "question": "在预训练模型中，微调是指在特定任务上对____进行额外训练。",
        "answer": "预训练模型"
    },
    {
        "type": "blank",
        "question": "在文本生成任务中，Perplexity是一种用于评估模型生成文本的____。",
        "answer": "困惑度"
    },
    {
        "type": "blank",
        "question": "在命名实体识别中，\"PER\"通常代表____。",
        "answer": "个人"
    },
    {
        "type": "blank",
        "question": "词嵌入中，距离相近的词语在向量空间中具有相似的____。",
        "answer": "语义"
    },
    {
        "type": "blank",
        "question": "在深度学习中，Batch Normalization的目的是防止____。",
        "answer": "梯度爆炸"
    },
    {
        "type": "blank",
        "question": "在文本分类中，使用逻辑回归时，梯度下降的目的是最小化损失函数以调整模型的____。",
        "answer": "参数"
    },
    {
        "type": "blank",
        "question": "语音识别的应用领域之一是实现____的功能。",
        "answer": "语音助手"
    }
];
