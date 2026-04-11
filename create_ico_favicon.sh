#!/bin/bash
# 创建简单的.ico favicon文件
# 此脚本使用ImageMagick生成.ico文件

echo "生成favicon.ico文件..."

# 检查ImageMagick是否安装
if ! command -v convert &> /dev/null; then
    echo "错误: ImageMagick未安装"
    echo "请先安装ImageMagick:"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "  CentOS/RHEL: sudo yum install ImageMagick"
    exit 1
fi

# 创建临时的PNG文件
echo "🦍" > temp_text.txt

# 生成16x16 PNG
convert -size 16x16 xc:'#3b82f6' \
  -fill '#1991a3' -draw 'circle 8,8 8,2' \
  -fill '#ffffff' -pointsize 10 -font Arial -draw "text 4,12 '🦍'" \
  favicon-16x16.png

# 生成32x32 PNG
convert -size 32x32 gradient:'#3b82f6-#ec4899' \
  -fill '#ffffff' -stroke '#1991a3' -strokewidth 1 -draw 'circle 16,16 16,4' \
  -fill '#ffffff' -pointsize 20 -font Arial -draw "text 8,24 '🦍'" \
  favicon-32x32.png

# 生成48x48 PNG
convert -size 48x48 gradient:'#3b82f6-#1991a3-#ec4899' \
  -fill '#ffffff' -stroke '#ffffff' -strokewidth 2 -draw 'circle 24,24 24,6' \
  -fill '#ffffff' -pointsize 30 -font Arial -draw "text 12,36 '🦍'" \
  favicon-48x48.png

# 将PNG文件合并为.ico
convert favicon-16x16.png favicon-32x32.png favicon-48x48.png favicon.ico

# 清理临时文件
rm -f favicon-16x16.png favicon-32x32.png favicon-48x48.png temp_text.txt

echo "✓ 生成 favicon.ico 成功"
echo "✓ 文件已保存在: $(pwd)/favicon.ico"
echo ""
echo "注意: 如果emoji显示不正确，您可以使用以下在线工具:"
echo "1. 访问 https://favicon.io/"
echo "2. 上传 favicon.svg 文件"
echo "3. 下载生成的.ico文件"