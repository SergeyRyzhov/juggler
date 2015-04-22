function rangir(masptr, n){
  var msr = [];
  var num = [];

  for (var i = 0; i < n; i++) {
    num[i] = 0;
    msr[i] = {
      v:undefined,
      next: undefined
    };
  }

  var centr;
  for (var i = 0; i < n; i++) {
    var x = i;
    while(masptr[x].next == undefined){
      if( 2 * num[x] + 1 >= n)
      {
        centr = x; break;
      }
      num[x]++;
      var y = masptr[x].v;
      mun[y] += num[x];
      //dispose(masptr[x]);
      var p = masptr[y];
      if(p.v == x){
        masptr[y] = p.next;
      }
      else{
        var q;
        while(p.v != x){
          q = p;
          p = p.next;
        }
        q.next = p.next;
      }
      //dispose(p)
      msr[x].v = y;
      p = {
        v:x;
        next:msr[y].next;
      }
      msr[y].next = p;
      x = y;
    }
  }
  msr[centr].v = 0;
  num[centr]++;
  return {
    msr:msr,
    num:num
  };
}
