let defaultColor = 'rgb(255, 255, 255)'
        let padlet = $('.padlet')
        
        $('.alert').hide()
    
        // Random color cells
        for(let i=1;i<=100;i++)
        {
            let r = Math.round(Math.random() * 255)  // *255 because random always create a number < 1
            let g = Math.round(Math.random() * 255)
            let b = Math.round(Math.random() * 255)
            let cell = $(`  <div id="${i}" ondrop="drop(event)" ondragover="allowDrop(event, this)">
                                <div draggable="true" ondragstart="drag(event)" id="padlet-cell${i}" style="background-color: rgb(${r}, ${g}, ${b})"></div>
                            </div>`)
            padlet.append(cell)
        }

        // Create cells in the store
        for(let i=1;i<=28;i++) 
            $('.store-area').append($(`<div class="store-cell" ondrop="drop(event)" ondragover="allowDrop(event, this)"></div>`))
    
        // Create the trash
        let i = document.createElement('i')

        i.setAttribute('class', 'fa fa-trash')
        i.setAttribute('id', 'icon')
        i.setAttribute('ondrop', 'drop(event)')
        i.setAttribute('ondragover', 'allowDrop(event, this)')
        i.style.fontSize = 'large'

        document.getElementsByClassName('store-cell')[27].appendChild(i)
        document.getElementsByClassName('store-cell')[27].style.paddingLeft = '8px'
        document.getElementsByClassName('store-cell')[27].style.paddingTop = '6px'
        document.getElementsByClassName('store-cell')[27].setAttribute('id', 'trash')

        $('.padlet div').hover(e =>
        {
            let cell = $(e.target)
            let rgbCode = cell.css('background-color')

            if(rgbCode === 'rgba(0, 0, 0, 0)')
                $('.rgb-code').html('Empty !')
            else
            {
                $('.rgb-code').html(rgbCode)
                $('body').css('background-color', rgbCode)
            }
        })

        $('.padlet div').mouseleave(() => 
        {
            $('body').css('background-color', defaultColor)
            $('.rgb-code').html(defaultColor)
        })

        $('.padlet div').click((e) =>
        {
            let cell = $(e.target)
            let rgbCode = cell.css('background-color')

            if(rgbCode != 'rgba(0, 0, 0, 0)')
            {
                defaultColor = rgbCode

                navigator.clipboard.writeText(rgbCode)
        
                showAlert($('.alert'), 'Background color has been changed.')

                setTimeout(() =>
                {
                    showAlert($('.alert'), 'Color has been copied to the clipboard')
                }, 4000)
            }
        })

        $('.rgb-code').click(() =>
        {
            navigator.clipboard.writeText($('.rgb-code').html())
            
            showAlert($('.alert'), 'Color has been copied to the clipboard')
        })

        $('.btn').click(() =>
        {
            for(let i=1;i<=100;i++)
            {
                let r = Math.round(Math.random() * 255)  
                let g = Math.round(Math.random() * 255)
                let b = Math.round(Math.random() * 255)
                if($('#' + i).children().length === 0)
                    $('#' + i).append($(`<div draggable="true" ondragstart="drag(event)" id="padlet-cell${i+100}" style="background-color: rgb(${r}, ${g}, ${b})"></div>`))
                else                                                                  // +100 in order to have unique id
                    $('#' + i).children()[0].style.backgroundColor = `rgb(${r}, ${g}, ${b}`                
            }

            showAlert($('.alert'), 'Get new colors success.')
        })

        function showAlert(alert, text)
        {
            alert.html(text)
            alert.fadeIn(2000)

            setTimeout(() =>
            {
                alert.fadeOut(1000)
            }, 3000)
        }

        // Drag and drop
        function allowDrop(ev, div) 
        {
            if(div.id === 'trash')
                div.style.color = 'rgb(255, 0, 0)'

            if(div.childElementCount === 0 || div.id === 'trash')
                ev.preventDefault();
            
        }

        function drag(ev) 
        {
            ev.dataTransfer.setData("text", ev.target.id)
            $('body').css('background-color', defaultColor)
        }

        function drop(ev) 
        {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");

            if(ev.target.id === 'trash' || ev.target.id === 'icon')
            {
                document.getElementById(data).remove()
                showAlert($('.alert'), 'Color has been removed')
            }
            else
            {
                ev.target.appendChild(document.getElementById(data));  
                showAlert($('.alert'), 'Color has been saved')
            }
                

            $('#trash').css('color', 'rgb(33, 37, 41)')
        }