# migration

[参考URL](https://railsdoc.com/migration)

直接SQLを使わずにDBのテーブルやカラムなどの構造を変更できる仕組み

```ruby
def change
end

# 昔からある記法
def up

def down
```

## has_many

has_manyは関連づけの中でも参照される側(親側)。一多対の関連

## where

whereメソッドに`カラム名:配列`というハッシュを渡すと、カラムの値が複数の候補のどれかと同じ

```ruby
members = Member.where(number: [15, 17, 19]) # 15 or 17 or 19
members = Member.where(number: 12..14) # 12 ~ 14
members = Member.where.not(number: 12..14) # 12 ~ 14ではない
members = Member.where.("name = ?", name) # プレースホルダ
```
