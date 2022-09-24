# GitHub Tips

## Git diffで特定の日付からの変更を確認したい場合

```sh
$ git diff HEAD 'HEAD@{2015-06-01}'  
// 同じ意味
$ git diff HEAD 'HEAD@{2015-06-01 0:00}'  
```