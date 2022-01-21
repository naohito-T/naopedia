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

