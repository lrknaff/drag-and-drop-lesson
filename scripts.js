$('.kanban-column-approved')
.on('drop', function(e) {
  e.preventDefault();
  console.log('Dropped!')
  $(this).removeClass('drop-zone-active')
})
.on('dragover', function(e) {
   e.preventDefault();
 })
 .on('dragenter', function(e) {
   $(this).addClass('drop-zone-active');
 })
 .on('dragleave', function(e) {
   $(this).removeClass('drop-zone-active')
 })
