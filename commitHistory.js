$(function() {
  console.log('Sanity Check');
  $.get('https://api.github.com/repos/rostonn/psv-calculator',function(text){
    // console.log('Sanity Check');
    // console.log(text);
    // console.log(text.name);
    var name = JSON.stringify(text.name);
    localStorage.setItem('commit',name);
    $('.title').append('<h1>'+text.name+' Commit History</h1>');
  })

  $.get("https://api.github.com/repos/rostonn/psv-calculator/commits",function(text){
    // console.log(text);
    // console.log(text[0].commit.message+' = Message');
    // console.log(text[0].commit.committer.date+ ' = Date');
    // var date = text[0].commit.committer.date
    // var date = date.slice(0,10);
    // console.log('Date = '+date);
    var j = 1;
    for(var i=text.length-1; i >-1; i--){
      var commitMessage = text[i].commit.message;
      var commitDate = (text[i].commit.committer.date).slice(0,10);
      // console.log('Message = '+commitMessage);
      // console.log('commitDate = '+commitDate);
      $('body').append('<h2>'+j+'. '+commitDate+': '+commitMessage+'</h2');
      j++;
    }
})

$('body').append(localStorage.getItem('commit'));
})
