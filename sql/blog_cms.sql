/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : blog_cms

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-11-28 23:37:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for photo
-- ----------------------------
DROP TABLE IF EXISTS `photo`;
CREATE TABLE `photo` (
  `id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `title` text CHARACTER SET utf8mb4 COMMENT '标题',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of photo
-- ----------------------------
INSERT INTO `photo` VALUES ('5537', '2', 'http://mm.chinasareview.com/wp-content/uploads/2017a/05/06/limg.jpg', '周末福利图，看了让人不淡定');
INSERT INTO `photo` VALUES ('5536', '2', 'http://mm.chinasareview.com/wp-content/uploads/2017a/05/05/limg.jpg', '真正的素颜美女，就是养眼！看完你一定会喜欢');
INSERT INTO `photo` VALUES ('5535', '2', 'http://mm.chinasareview.com/wp-content/uploads/2017a/05/04/limg.jpg', '儿童节。。我们不发污图的以示纯洁');
INSERT INTO `photo` VALUES ('5534', '2', 'http://mm.chinasareview.com/wp-content/uploads/2017a/05/03/limg.jpg', '祝大家端午节安康，附赠一波福利');
INSERT INTO `photo` VALUES ('5533', '2', 'http://mm.chinasareview.com/wp-content/uploads/2017a/05/02/limg.jpg', '库里球迷颜值不错身材也不赖');
INSERT INTO `photo` VALUES ('5532', '2', 'http://mm.chinasareview.com/wp-content/uploads/2017a/05/01/limg.jpg', '求你，别让我哭了');
INSERT INTO `photo` VALUES ('5531', '2', 'http://mm.chinasareview.com/wp-content/uploads/2017a/04/19/limg.jpg', '那些性感的人儿（24）');
INSERT INTO `photo` VALUES ('5530', '2', 'http://mm.chinasareview.com/wp-content/uploads/2017a/04/18/limg.jpg', '评一评，你觉得哪个妹纸最打动你的心？');
INSERT INTO `photo` VALUES ('5571', '1', 'http://mm.chinasareview.com/wp-content/uploads/2017a/07/07/limg.jpg', '我只想说，有酒窝的妹纸真可爱');
INSERT INTO `photo` VALUES ('5572', '1', 'http://mm.chinasareview.com/wp-content/uploads/2017a/07/08/limg.jpg', '简直...不一样的可爱风，刮的你不要不要的');
INSERT INTO `photo` VALUES ('5573', '1', 'http://mm.chinasareview.com/wp-content/uploads/2017a/07/09/limg.jpg', '周末福利图，个个身材都超赞');
INSERT INTO `photo` VALUES ('5574', '1', 'http://mm.chinasareview.com/wp-content/uploads/2017a/07/10/limg.jpg', '晚上拍照不美哒哒？看到这张图你就明白你缺了什么');
INSERT INTO `photo` VALUES ('5575', '1', 'http://mm.chinasareview.com/wp-content/uploads/2017a/07/11/limg.jpg', '短发女孩真的很可爱，君是不是有想让女票理发的冲动？');
INSERT INTO `photo` VALUES ('5576', '1', 'http://mm.chinasareview.com/wp-content/uploads/2017a/07/12/limg.jpg', '超高颜值的同时不乏一丝性感，等等，岂止是一丝');
INSERT INTO `photo` VALUES ('5502', '3', 'http://mm.chinasareview.com/wp-content/uploads/2017a/03/02/limg.jpg', '两个清纯妹纸在教室里居然这个姿势');
INSERT INTO `photo` VALUES ('5501', '3', 'http://mm.chinasareview.com/wp-content/uploads/2017a/03/01/limg.jpg', '纯美的女子，洁白的内衣写真');
INSERT INTO `photo` VALUES ('5500', '3', 'http://mm.chinasareview.com/wp-content/uploads/2017a/01/08/limg.jpg', '新版蓉妹妹你喜欢吗？ 白色精灵李一桐写真');
INSERT INTO `photo` VALUES ('5499', '3', 'http://mm.chinasareview.com/wp-content/uploads/2017a/02/07/limg.jpg', '香车美女，最完美的黄金搭档');
INSERT INTO `photo` VALUES ('5498', '3', 'http://mm.chinasareview.com/wp-content/uploads/2017a/02/06/limg.jpg', '青葱校园里的印记，清纯如你');
INSERT INTO `photo` VALUES ('5497', '3', 'http://mm.chinasareview.com/wp-content/uploads/2017a/02/05/limg.jpg', '难以抗拒你的红唇');
INSERT INTO `photo` VALUES ('5496', '3', 'http://mm.chinasareview.com/wp-content/uploads/2017a/02/04/limg.jpg', '机车妹子总有一种无法抗拒的野性');

-- ----------------------------
-- Table structure for photo_detail
-- ----------------------------
DROP TABLE IF EXISTS `photo_detail`;
CREATE TABLE `photo_detail` (
  `id` int(11) NOT NULL,
  `list` text CHARACTER SET utf8mb4,
  `title` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `tag` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of photo_detail
-- ----------------------------
INSERT INTO `photo_detail` VALUES ('4799', '[\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/58/01.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/58/02.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/58/03.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/58/04.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/58/05.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/58/06.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/58/07.jpg\"]', '曾经也有一个笑容出现在我的生命里', '清纯 , 妹子 , 长发 , \r\n    ');
INSERT INTO `photo_detail` VALUES ('4790', '[\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/47/01.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/47/02.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/47/03.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/47/04.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/47/05.jpg\"]', '体操服，冬日网球少女', '清纯 , 少女 , \r\n    ');
INSERT INTO `photo_detail` VALUES ('4795', '[\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/54/01.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/54/02.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/54/03.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/54/04.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/54/05.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/54/06.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/54/07.jpg\"]', '长腿性感模特，要的就是那股时尚范儿', '性感 , 长腿 , 模特 , \r\n    ');
INSERT INTO `photo_detail` VALUES ('4794', '[\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/52/01.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/52/02.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/52/03.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/52/04.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2015a/01/52/05.jpg\"]', '冬日暖歌，清纯女生静静的发呆', '清纯 , 女生 , 妹子 , \r\n    ');
INSERT INTO `photo_detail` VALUES ('4083', '[\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/12/01.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/12/02.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/12/03.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/12/04.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/12/05.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/12/06.jpg\"]', '甜甜美美的MM薄纱小私房', '私房 , 写真 , 甜美 , 妹子 , \r\n    ');
INSERT INTO `photo_detail` VALUES ('4067', '[\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/59/01.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/59/02.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/59/03.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/59/04.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/59/05.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/59/06.jpg\"]', '可爱俏皮的妹子，青春女仆变学生装', '女仆 , 学生 , 妹子 , 制服 , 俏皮 , \r\n    ');
INSERT INTO `photo_detail` VALUES ('4066', '[\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/58/01.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/58/02.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/58/03.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/58/04.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/58/05.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/58/06.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/58/07.jpg\"]', '气质清新可爱喜欢卖萌的宅男女神小泽', '性感 , 可爱 , 美女 , 萌妹子 , 诱惑 , 宅男女神 , \r\n    ');
INSERT INTO `photo_detail` VALUES ('4077', '[\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/06/01.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/06/02.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/06/03.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/06/04.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/06/05.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/06/06.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/06/07.jpg\"]', '甜美女生惹人爱，谁知少女情怀', '甜美 , 可爱 , 清纯 , 妹子 , 少女 , 萝莉 , \r\n    ');
INSERT INTO `photo_detail` VALUES ('4097', '[\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/26/01.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/26/02.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/26/03.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/26/04.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/26/05.jpg\"]', '清纯16岁女生初拍写真略显羞涩', '写真 , 清纯 , 校花 , 妹子 , 少女 , \r\n    ');
INSERT INTO `photo_detail` VALUES ('4088', '[\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/17/01.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/17/02.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/17/03.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/17/04.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/17/05.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/17/06.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/17/07.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/17/08.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/03/17/09.jpg\"]', '欧美内衣性感风，绝佳身材的西洋美女', '性感 , 欧美 , 成熟 , 比基尼 , 曲线 , 模特 , \r\n    ');
INSERT INTO `photo_detail` VALUES ('4064', '[\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/56/01.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/56/02.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/56/03.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/56/04.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/56/05.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/56/06.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/56/07.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/56/08.jpg\"]', '夜色里柔美飘逸邻家气质女孩', '气质 , 妹子 , 御姐 , 白富美 , \r\n    ');
INSERT INTO `photo_detail` VALUES ('4059', '[\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/51/01.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/51/02.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/51/03.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/51/04.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/51/05.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/51/06.jpg\",\"http://mm.chinasareview.com/wp-content/uploads/2014a/02/51/07.jpg\"]', '芳香袭人，清纯女主播Mini最新写真', '清纯 , 妹子 , 小清新 , 明星 , \r\n    ');
