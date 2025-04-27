document.addEventListener("DOMContentLoaded", function(){

    let resultJson = []; // 기본값 배열
    let totalHint = 0; 
    let usedCodes = new Set(); // 중복없이 저장


    // (1) 페이지 로드할 때 로컬스토리지에서 불러오기
    let savedData = localStorage.getItem("myExcelData");
    if (savedData) {
        resultJson = JSON.parse(savedData);
        console.log("불러온 데이터:", resultJson);
    }

    // (2) 관리자 페이지 열기
    $('footer .adminBtn').click(function(){
        $('.adminWrap').css("display", "flex");
    });

    // (3) 업로드 버튼 클릭
    $('.uploadBtn').click(function(){
        let password = $('.adminWrap input[type="text"]').val();
        let file = $('.adminWrap input[type="file"]')[0].files[0];

        if(password !== "9132"){
            alert("비밀번호가 틀렸습니다.");
            return;
        }

        if(!file){
            alert("파일을 선택해주세요.");
            return;
        }

        let reader = new FileReader();
        reader.onload = function(e) {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, {type: 'array'});

            let firstSheetName = workbook.SheetNames[0];
            let worksheet = workbook.Sheets[firstSheetName];

            resultJson = XLSX.utils.sheet_to_json(worksheet);

            // (4) 저장하기
            localStorage.setItem("myExcelData", JSON.stringify(resultJson));

            console.log("업로드 완료!", resultJson);
            $('.adminWrap').css("display", "none");
        };
        reader.readAsArrayBuffer(file);
    });

    
    $('.searchBtn').click(function() {
        let code = $('.searchBox input').val().trim(); 
        if (!code) {
            alert("힌트코드를 입력해주세요.");
            return;
        }
    
        let found = resultJson.find(item => item.힌트코드 == code);
        if (found) {
            currentItem = found;
            $('.contentDiv').text(found.힌트);
            $('.resultDiv').text(""); // 정답 비우기
    
            // ✅ 처음 본 힌트코드라면 힌트 사용 카운트 +1
            if (!usedCodes.has(code)) {
                totalHint++;
                usedCodes.add(code); // 사용한 코드로 저장
            }
    
            $('.totalHint .count').text(totalHint + "개");
            $('.btnDiv').show();
        } else {
            alert("해당 힌트코드를 찾을 수 없습니다.");
            $('.contentDiv').text("");
            $('.resultDiv').text("");
            $('.btnDiv').hide();
        }
    });
    

    $('.showResult').click(function() {
        if (currentItem) {
            $('.resultDiv').text(currentItem.정답);
        } else {
            alert("먼저 힌트코드를 검색해주세요.");
        }
    });


    $('.backBtn').click(function() {
        $('.btnDiv').hide();
        $('.searchBox input').val('');
        $('.contentDiv').text('');
        $('.resultDiv').text('');
        currentItem = null;
    });
});
